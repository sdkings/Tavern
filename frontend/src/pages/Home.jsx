import React, { useEffect, useState } from 'react';
import '../styles/pages/Home.css';
import FollowRequests from '../components/FollowRequests';
import Cookies from 'js-cookie'; 
import { getAuthorProfile } from '../services/profileService'; 
import api from '../services/axios'; // Adjust the import based on your file structure

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Public');
  const [authorProfiles, setAuthorProfiles] = useState({}); 

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('posts/'); // Using axios instance to fetch posts
        const data = response.data; // Accessing data directly from the response

        // Set posts directly from the response structure
        setPosts(data.posts); 

        // Fetch author profiles based on the retrieved posts
        const profiles = await Promise.all(
          data.posts.map(async (post) => {
            try {
              const profile = await getAuthorProfile(post.author_id);
              return { authorId: post.author_id, displayName: profile.displayName, profileImage: profile.profileImage }; 
            } catch (profileError) {
              console.error(`Error fetching profile for author ${post.author_id}:`, profileError);
              return { authorId: post.author_id, displayName: null, profileImage: null };
            }
          })
        );

        const profileMap = profiles.reduce((acc, { authorId, displayName, profileImage }) => {
          acc[authorId] = { displayName, profileImage };
          return acc;
        }, {});
        setAuthorProfiles(profileMap);

      } catch (err) {
        console.error('Fetch Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }

  // Filter posts based on visibility and selected filter
  const filteredPosts = posts.filter(post => {
    if (selectedFilter === 'Public') {
      return post.visibility === 'PUBLIC';
    }  else if (selectedFilter === 'Unlisted') {
      return post.visibility === 'UNLISTED'; 
    } else if (selectedFilter === 'Friends') { // Add logic for FRIENDS visibility if needed
      return post.visibility === 'FRIENDS';
    }
    return true; // Fallback case, should return all posts if no filter is selected
  });
  

  return (
    <div className='home-page-container'>
      <div className='home-container'>
        <div className='home-texts'>
          <h1>Feeds</h1>
          <div className='home-filter-options'>
            <h3 onClick={() => handleFilterClick('Public')} style={{ opacity: selectedFilter === 'Public' ? '100%' : '50%', cursor: 'pointer' }}>
              Public
            </h3>
            <h3 onClick={() => handleFilterClick('Friends')} style={{ opacity: selectedFilter === 'Friends' ? '100%' : '50%', cursor: 'pointer' }}>
              Friends
            </h3>
            <h3 onClick={() => handleFilterClick('Unlisted')} style={{ opacity: selectedFilter === 'Unlisted' ? '100%' : '50%', cursor: 'pointer' }}>
              Unlisted
            </h3>
          </div>
        </div>
        <div className='posts-container'>
          <div className='posts-list'>
            {filteredPosts.length > 0 ? (
              <ul>
                {filteredPosts.map((post) => (
                  <li key={post.id}> 
                    <div className='posts-det-content'>
                      <div className='author-container'>
                        {authorProfiles[post.author_id]?.profileImage && (
                        <img
                          src={authorProfiles[post.author_id]?.profileImage}
                          alt="Author Profile"
                          style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                        />
                        )}
                        <div className='author-detail'>
                          <h3>{authorProfiles[post.author_id]?.displayName || 'Anonymous'}</h3>
                          <p>{new Date(post.published).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <h4>{post.title}</h4>
                      <p>{post.text_content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </div>
      </div>
      <FollowRequests />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { getMarkdownText } from '../utils/getMarkdownText';
import { getPostImageUrl } from '../services/PostsService';
import '../styles/components/PostBox.css';
import LikeButton from './LikeButton';
import CommentsModal from './CommentsModal';
import { BorderColor } from "@mui/icons-material";

const PostBox = ({ post, poster, isUserEditable }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const posterName = poster ? poster.displayName : 'Anonymous';
  const posterImageUrl = poster ? poster.profileImage : null;

  useEffect(() => {
    const getImgUrlFromServer = async () => {
      // console.log(JSON.stringify(post));
      try {
        const imageUrlFromServer = await getPostImageUrl(
          post.author_id,
          post.id
        );
        setImageUrl(imageUrlFromServer);
      } catch {
        setImageUrl(null);
      }
    };
    if (post.content_type === 'image') {
      getImgUrlFromServer();
    }
  }, []);

  return (
    <div className="post-box">
      <div className="post-header">
        {posterImageUrl ? (
          <div className="profile-image-container">
            <img src={posterImageUrl} alt="profile" className="profile-image" />
          </div>
        ) : (
          <div className="profile-image-default" />
        )}
        <div className="poster-name-date">
          <h4>{posterName}</h4>
          <p>{new Date(post.published).toLocaleString()}</p>
        </div>
        {isUserEditable && (
          <div className='post-edit'>
            <button className='post-edit-button'>
              <BorderColor className='post-edit-icon' />
            </button>
          </div>
        )}
      </div>
      <div className="post-content">
        <h2>{post.title}</h2>
        {post.content_type === 'text/plain' && <p>{post.text_content}</p>}
        {post.content_type === 'image' && <img src={imageUrl} alt="post" />}
        {post.content_type === 'text/markdown' && (
          <div dangerouslySetInnerHTML={getMarkdownText(post.text_content)} />
        )}
      </div>
      <div className="post-footer">
          <LikeButton postId={post.id} />
          <CommentsModal postId={post.id} />
      </div>
    </div>
  );
};

export default PostBox;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Post from '../pages/Post';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import EditProfile from '../pages/EditProfile';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<Post />} />
      <Route path="/profile/:id/edit" element={<EditProfile />} />
      <Route path="/profile/:authorId" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;

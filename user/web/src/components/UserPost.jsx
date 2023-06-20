import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/slices/postSlice';

const UserPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post);
  const userId = localStorage.getItem('userId')
  useEffect(() => {
    if (userId) {
        dispatch(fetchPosts(userId));
      }
  }, [dispatch, userId]);

  const convertBufferToBase64 = buffer => {
    const binary = Array.from(new Uint8Array(buffer));
    const base64 = btoa(binary.map(byte => String.fromCharCode(byte)).join(''));
    return base64;
  };

  return (
    <div>
      <h2>User Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              {post.photo && (
                <img src={`data:image/jpeg;base64,${convertBufferToBase64(post.photo.data)}`} alt="Post" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPosts;
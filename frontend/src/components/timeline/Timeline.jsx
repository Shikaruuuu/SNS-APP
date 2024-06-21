import React, { useContext, useEffect, useState } from 'react';
import "./Timeline.css";
import Share from '../share/Share';
import Post from '../post/Post';
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user || !user.id) return; // ここでuserがnullでないことを確認
      try {
        console.log(`Fetching posts for user ID: ${user.id}`);
        const response = await axios.get(`/posts/timeline/${user.id}`);
        console.log("Posts fetched successfully:", response.data);
        setPosts(
          response.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [user]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}

// components/FollowList/FollowList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./FollowList.css";

export default function FollowList({ userId, type }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/users/${userId}/${type}`);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [userId, type]);

  return (
    <div className="followList">
      <h3>{type === "followings" ? "Following" : "Followers"}</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/profile/${user.id}`}>
              <img src={user.profilePicture || "/person/noAvatar.png"} alt="" className="followListImg" />
              <span className="followListName">{user.username}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

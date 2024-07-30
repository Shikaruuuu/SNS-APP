import React, { useContext, useEffect, useState } from 'react';
import "./Followings.css";
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';
import { useParams } from 'react-router-dom';

export default function Followings() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [followingUsers, setFollowingUsers] = useState([]);
    const { userId } = useParams(); 
    const { user: currentUser } = useContext(AuthContext);  // ログインしているユーザー
    useEffect(() => {
      const fetchFollowings =async () => {
        try {
          //ログインユーザーのフォロワーを取得
          const response = await axios.get(`/users/${userId}/followings`, {
            params: { userId: currentUser.id },
          });
          setFollowingUsers(response.data.sort((user1,user2) => {
            return new Date(user2.createdAt) - new Date(user1.createdAt);
          }));
        } catch (err) {
          console.error("Error fetching followingUsers", err);
        };
      };
      fetchFollowings();
    },[userId]);

    return (
        <div className='followings'>
            <div className='followingsWrapper'>
                <h4>フォロー中のユーザー</h4>
                <ul>
                  {followingUsers.map(user => (
                    <li key={user.id}>
                      <div className="followingUser">
                        <img 
                          src={user.profilePicture ? `${PUBLIC_FOLDER}${user.profilePicture}` : `${PUBLIC_FOLDER}/person/noAvatar.png`}
                          alt="" 
                          className="followingUserImg"
                        />
                        <span className="followingUsername">{user.username}</span>
                      </div>
                    </li>
                  ))}
                </ul>
            </div>
        </div>
    )
};
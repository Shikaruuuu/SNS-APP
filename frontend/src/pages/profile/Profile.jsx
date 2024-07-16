import React, { useEffect, useState, useContext } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Timeline from '../../components/timeline/Timeline';
import Rightbar from '../../components/rightbar/Rightbar';
import "./Profile.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users?userId=${userId}`);
        setUser(response.data);
        setIsFollowed(currentUser.followings.includes(userId));
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [userId, currentUser]);

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await axios.put(`/users/${userId}/unfollow`, { userId: currentUser.id });
      } else {
        await axios.put(`/users/${userId}/follow`, { userId: currentUser.id });
      }
      setIsFollowed(!isFollowed);
    } catch (err) {
      console.error("Error following/unfollowing user:", err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {user.coverPicture ? (
                <img src={PUBLIC_FOLDER + user.coverPicture} alt="" className="profileCoverImg" />
              ) : (
                <img src={PUBLIC_FOLDER + "/post/3.jpeg"} alt="" className="profileCoverImg" />
              )}
              {user.profilePicture ? (
                <img src={PUBLIC_FOLDER + user.profilePicture} alt="" className="profileUserImg" />
              ) : (
                <img src={PUBLIC_FOLDER + "/person/noAvatar.png"} alt="" className="profileUserImg" />
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
              {userId !== String(currentUser.id) && (
                <button className="followButton" onClick={handleFollow}>
                  {isFollowed ? 'Unfollow' : 'Follow'}
                </button>
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            <Timeline isProfile={true} profileUserId={userId} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useContext } from 'react';
import { Home, Person } from "@mui/icons-material";
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Sidebar() {
  const { user } = useContext(AuthContext); 
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Home  className="sidebarIcon"/>
            <Link to="/" className="sidebarLink" style={{ textDecoration: "none", color: "black" }}>
            <span className="sidebarListItemText">ホーム</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Person  className="sidebarIcon"/>
            <Link to={`/followingList/${user.id}/followings`} className="sidebarListItemText" style={{ textDecoration: "none", color: "black" }}>
            <span className="sidebarListItemText">フォロー中</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Person  className="sidebarIcon"/>
            <Link to={`/followerList/${user.id}/followers`} className="sidebarListItemText" style={{ textDecoration: "none", color: "black" }}>
            <span className="sidebarListItemText">フォロワー</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Person  className="sidebarIcon"/>
            <Link to={user ? `/profile/${user.id}` : "/login"} className="sidebarLink" style={{ textDecoration: "none", color: "black" }}>
            <span className="sidebarListItemText">プロフィール</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

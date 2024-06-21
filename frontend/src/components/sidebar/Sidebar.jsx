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
            <span className="sidebarListItemText">フォロー中</span>
          </li>
          <li className="sidebarListItem">
            <Person  className="sidebarIcon"/>
            <span className="sidebarListItemText">フォロワー</span>
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

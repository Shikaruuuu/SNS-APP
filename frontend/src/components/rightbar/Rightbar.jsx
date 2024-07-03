import React from 'react'
import "./Rightbar.css"

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const HomeRightbar = () => {
    return (
      <>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      </>
    );
  };

  return ( 
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

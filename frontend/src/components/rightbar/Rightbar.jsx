import React from 'react'
import "./Rightbar.css"

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const HomeRightbar = () => {
    return (
      <>
        {/* <p className="promotionTitle">プロモーション広告</p>
        <img src="assets/promotion/promotion1.jpeg" alt=""  className="rightbarPromotionImg" />
        <p className="promotionName">ショッピング</p>
        <img src="assets/promotion/promotion2.jpeg" alt=""  className="rightbarPromotionImg" />
        <p className="promotionName">カーショップ</p>
        <img src="assets/promotion/promotion3.jpeg" alt=""  className="rightbarPromotionImg" />
        <p className="promotionName">モーリーワークス</p> */}
        </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {/* <h4 className="rightbarTitle">ユーザー情報</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">出身：</span>
          <span className="rightbarInfoKey">福岡</span>
        </div>
        <h4 className="rightbarTitle">あなたの友達</h4>
        <div className="rightbarfollowings">
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "/person/1.jpeg"} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">れにゃあ</span>
          </div>
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "/person/2.jpeg"} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">yamaki</span>
          </div>
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "/person/3.jpeg"} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">koga</span>
          </div>
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "/person/4.jpeg"} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">matsukubo</span>
          </div>
        </div>
      </div> */}
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

import React, { useContext, useRef, useState } from 'react';
import { Image } from '@mui/icons-material';
import "./Share.css";
import { AuthContext } from '../../state/AuthContext';
import axios from 'axios';

export default function Share() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;  // user が null なら処理を中断

        const newPost = {
            userId: user.id,
            desc: desc.current.value,
        };

        if(file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err)
            }
        }

        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    if (!user) {
        return null; // user が null なら何も表示しない
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "/person/noAvatar.png"} alt="" className="shareProfileImg"></img>
                    <input type="text" className="shareInput" placeholder="今何してるの" ref={desc}></input>
                </div>
                <hr className="shareHr" />

                <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
                    <div className="shareOptions">
                        <label className="shareOption" htmlFor='file'>
                            <Image className="shareIcon" htmlColor='blue' />
                            <span className="shareOptionText">画像</span>
                            <input type='file' id='file' accept='.png, .jpeg, .jpg, .gif' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
                        </label>
                    </div>
                    <button className="shareButton" type='submit'>投稿</button>
                </form>
            </div>
        </div>
    );
}

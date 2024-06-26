const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//投稿を作成する
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      userId: req.body.userId,
      desc: req.body.desc,
      img: req.body.img,
      likes: req.body.likes || [],
    });
    return res.status(200).json(newPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 投稿を更新する
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post.userId === req.body.userId) {
      await post.update(req.body);
      return res.status(200).json("投稿の編集に成功しました");
    } else {
      return res.status(403).json("あなたは他の人の投稿を編集できません");
    }
  } catch (err) {
    console.error("Error updating post:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// 投稿を削除する
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post.userId === req.body.userId) {
      await post.destroy();
      return res.status(200).json("投稿の削除に成功しました");
    } else {
      return res.status(403).json("あなたは他の人の投稿を削除できません");
    }
  } catch (err) {
    console.error("Error deleting post:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// 特定の投稿を取得する
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// likesを管理するエンドポイント
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.update({ likes: [...post.likes, req.body.userId] });
      return res.status(200).json("投稿にいいねを押しました");
    } else {
      await post.update({
        likes: post.likes.filter((id) => id !== req.body.userId),
      });
      return res.status(200).json("いいねを外しました");
    }
  } catch (err) {
    console.error("Error liking post:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// プロフィール専用タイムライン
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    const posts = await Post.findAll({ where: { userId: user.id } });
    return res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching profile timeline:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// 全てのユーザーの投稿を取得
router.get("/timeline/all", async (req, res) => {
  try {
    const result = await Post.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching all posts:", err);
    res.status(500).json({ message: "Failed to fetch posts", error: err });
  }
});

// 特定のユーザーのタイムラインの投稿を取得する
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findByPk(req.params.userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Current user:", currentUser);

    const userPosts = await Post.findAll({
      where: { userId: currentUser.id.toString() },
    });
    console.log("User posts:", userPosts);

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.findAll({ where: { userId: friendId.toString() } });
      })
    );
    console.log("Friend posts:", friendPosts);

    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.error("Error fetching timeline posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

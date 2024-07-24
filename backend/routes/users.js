const router = require("express").Router();
const { User, Follow } = require("../models"); // modelsからUserとFollowをインポート

// ユーザー情報の更新
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.update(req.body, {
        where: { id: req.params.id },
      });
      return res.status(200).json("ユーザー情報が更新できました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントの時だけ情報を更新できます");
  }
});

// ユーザー情報の削除
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.destroy({ where: { id: req.params.id } });
      return res.status(200).json("ユーザー情報を削除しました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("あなたは自分のアカウントの時だけ削除できます");
  }
});

// クエリでユーザー情報の取得
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findOne({ where: { id: userId } })
      : await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ message: "ユーザーが見つかりません" });
    }

    const { password, updatedAt, ...other } = user.dataValues;
    res.status(200).json(other);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findByPk(req.params.id);
      const currentUser = await User.findByPk(req.body.userId);
      if (!user) {
        console.log("User not found");
        return res.status(404).json("ユーザーが見つかりません");
      }
      if (!currentUser) {
        console.log("Current user not found");
        return res.status(404).json("現在のユーザーが見つかりません");
      }

      const follow = await Follow.findOne({
        where: {
          followerId: req.body.userId,
          followingId: req.params.id,
        },
      });
      if (!follow) {
        await Follow.create({
          followerId: req.body.userId,
          followingId: req.params.id,
        });
        return res.status(200).json("フォローに成功しました");
      } else {
        return res
          .status(403)
          .json("あなたはすでにこのユーザーをフォローしています");
      }
    } catch (err) {
      console.error("フォローエラー:", err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォローできません");
  }
});

// ユーザーのフォロー解除
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const follow = await Follow.findOne({
        where: {
          followerId: req.body.userId,
          followingId: req.params.id,
        },
      });
      if (follow) {
        await follow.destroy();
        return res.status(200).json("フォロー解除しました");
      } else {
        return res.status(403).json("このユーザーはフォロー解除できません");
      }
    } catch (err) {
      console.error("フォロー解除エラー:", err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォロー解除できません");
  }
});

// フォロー状態の確認
router.get("/:id/isFollowed", async (req, res) => {
  try {
    const follow = await Follow.findOne({
      where: {
        followerId: req.query.userId,
        followingId: req.params.id,
      },
    });
    res.status(200).json({ isFollowed: !!follow });
  } catch (err) {
    console.error("フォロー状態確認エラー:", err);
    res.status(500).json(err);
  }
});

// フォローしているユーザーの一覧を取得
router.get("/:id/followings", async (req, res) => {
  try {
    const followings = await Follow.findAll({
      where: { followerId: req.params.id },
      include: [{ model: User, as: "following" }],
    });
    res.status(200).json(followings);
  } catch (err) {
    res.status(500).json(err);
  }
});

// フォロワーの一覧を取得
router.get("/:id/followers", async (req, res) => {
  try {
    const followers = await Follow.findAll({
      where: { followingId: req.params.id },
      include: [{ model: User, as: "follower" }],
    });
    res.status(200).json(followers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

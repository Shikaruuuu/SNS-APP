const router = require("express").Router();
const User = require("../models/User"); // モデルをインポート

// ユーザー情報の更新
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.update(req.body, {
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
      ? await User.findByPk(userId)
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
      if (!user.followers.includes(req.body.userId)) {
        user.followers.push(req.body.userId);
        currentUser.followings.push(req.params.id);
        await user.save();
        await currentUser.save();
        return res.status(200).json("フォローに成功しました");
      } else {
        return res
          .status(403)
          .json("あなたはすでにこのユーザーをフォローしています");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォローできません");
  }
});

// ユーザーのフォローを外す
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findByPk(req.params.id);
      const currentUser = await User.findByPk(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        user.followers = user.followers.filter((id) => id !== req.body.userId);
        currentUser.followings = currentUser.followings.filter(
          (id) => id !== req.params.id
        );
        await user.save();
        await currentUser.save();
        return res.status(200).json("フォロー解除しました");
      } else {
        return res.status(403).json("このユーザーはフォロー解除できません");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォロー解除できません");
  }
});

module.exports = router;

require("dotenv").config();
const sequelize = require("./sequelize");
const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
const PORT = process.env.PORT || 4000;
const { Pool } = require("pg");
const path = require("path");
const cors = require("cors");

// データベース接続のテスト
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Sequelize モデルの同期
if (process.env.NODE_ENV !== "production") {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("データベースとモデルが同期されました");
    })
    .catch((err) => {
      console.error("データベース同期エラー:", err);
    });
}

// CORSミドルウェアを使用
app.use(cors());

// ミドルウェア
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);

// グローバルエラーハンドラー
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (req, res) => {
  res.send("hello express");
});

app.listen(PORT, () => console.log(`サーバーがポート ${PORT} で起動しました`));

import express from "express";
const router = express.Router();

router.post("/auth/login", (req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  if (req.body.id !== "user" || req.body.password !== "user") {
    res.send({
      result: { errorCode: 401, message: "ID／パスワードが不正です。" }
    });
    return;
  }
  res.send({
    result: { errorCode: 0, message: "" },
    contents: {
      id: req.body.id,
      name: "ゲスト"
    }
  });
});

export default router;

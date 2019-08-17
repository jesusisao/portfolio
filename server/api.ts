import express from "express";
const router = express.Router();

router.post("/auth/login", (req, res) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send({
    result: { errorCode: 0, message: "" },
    contents: {}
  });
});

export default router;

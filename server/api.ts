import express from "express";
import profile from "./profile.json"
import career from "./career.json"
const router = express.Router();

router.post("/auth/test", async (req, res) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send({
    result: { errorCode: 0, message: "" }
  });
});

router.post("/profile", async (req, res) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send({
    result: { errorCode: 0, message: "" },
    contents: {
      articles: profile
    }
  });
});

router.post("/career", async (req, res) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send({
    result: { errorCode: 0, message: "" },
    contents: {
      articles: career
    }
  });
});

export default router;

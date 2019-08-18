import express from "express";
const router = express.Router();

router.post("/auth/test", async (req, res) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send({
    result: { errorCode: 0, message: "" }
  });
});

export default router;

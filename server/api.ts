import express from "express";
import admin from "./myFirebaseAdmin";
const router = express.Router();

router.post("/auth/test", async (req, res) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  const idToken = req.body.idToken;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.send({
      result: { errorCode: 0, message: "" },
      contents: {
        decodedToken: decodedToken
      }
    });
  } catch (e) {
    res.send({
      result: { errorCode: 100, message: e },
    });
  }
});

export default router;

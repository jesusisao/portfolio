import mysql from "promise-mysql";
import express from "express";
const router = express.Router();

let poolCache: mysql.Pool | null = null;
const getPool = async () => {
  if (poolCache !== null) return poolCache;
  // JAWSDB_URLはJAWSDBを入れた時にHeroku側でデフォルトで作られるNodeの環境変数。
  // その中に接続情報が入ってる。
  poolCache = await mysql.createPool(
    process.env.JAWSDB_URL + "?multipleStatements=true?charset=utf8_general_ci"
  );
  return poolCache;
};

router.post("/profile", async (req, res) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  const pool = await getPool();
  try {
    const results = await pool.query(
      "SELECT * FROM articles WHERE title = 'profile'"
    );
    res.send({
      result: { errorCode: 0, message: "" },
      contents: {
        articles: JSON.parse(results[0].contents)
      }
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/career", async (req, res) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  const pool = await getPool();
  try {
    const results = await pool.query(
      "SELECT * FROM articles WHERE title = 'career'"
    );
    res.send({
      result: { errorCode: 0, message: "" },
      contents: {
        articles: JSON.parse(results[0].contents)
      }
    });
  } catch (err) {
    throw new Error(err);
  }
});

export default router;

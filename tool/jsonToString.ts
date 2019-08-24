const fs = require("fs");
const consola = require("consola");

// 引数0,1はts-nodeを使う都合上既に埋まっている
if (process.argv.length !== 3) {
  consola.error({
    message: `引数にパスの指定が必要です。`,
    badge: true
  });
  process.exit(1);
}

const jsonPath: string = process.argv[2];
const filename = jsonPath.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")![1];
const userJson = require(jsonPath);
const str = JSON.stringify(userJson);
const distPath = "./tool/dist";
try {
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }
  fs.writeFileSync(`${distPath}/${filename}.txt`, str);
  consola.success({
    message: `completed.`,
    badge: true
  });
} catch (e) {
  console.log(e);
}

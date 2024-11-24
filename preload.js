// 该文件支持运行 node，electron 和 utools 的 api
const fs = require('fs');

console.log("preload js loaded")

window.readLocalFile = function (path) {
  if (path.match(/\.json$/i)) {
    return fs.readFileSync(path, {
      encoding: "utf-8"
    });
  } else {
    return "";
  }
}

window.writeLocalFile = function (path, content) {
  if (fs.existsSync(path)) {
    if (path.match(/\.md$/i)) {
      fs.writeFileSync(path, content)
      return true;
    } else {
      return false;
    }
  } else {
    fs.writeFileSync(path, content)
    return true;
  }
}

// expandGlobal.js
import url from "node:url";
import path from "node:path";
import { createRequire } from "node:module";

Object.defineProperty(global, "loadJSON", {
  get() {
    return (filepath, importMetaUrl) => {
      const reg = /\S+.json$/g;
      if (reg.test(filepath)) {
        const require = createRequire(importMetaUrl);
        return require(filepath);
      } else {
        throw new Error("loadJSON 的参数必须是一个json文件");
      }
    };
  },
  enumerable: true,
  configurable: false,
  // writable: false,
});

Object.defineProperty(global, "getFileName", {
  get() {
    return (importMetaUrl) => {
      return url.fileURLToPath(importMetaUrl);
    };
  },
  enumerable: true,
  configurable: false,
  // writable: false,
});

Object.defineProperty(global, "getDirName", {
  get() {
    return (importMetaUrl) => {
      return path.dirname(url.fileURLToPath(importMetaUrl));
    };
  },
  enumerable: true,
  configurable: false,
  // writable: false,
});
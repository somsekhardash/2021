const path = require("path");
const fs = require("fs");
const url = require("url");

const resolveApp = (relativePath) => path.resolve("./", relativePath);

module.exports = {
  dotenv: resolveApp(".env"),
  appBuild: resolveApp("build"),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  appDevIndexJs: resolveApp("src/demo/index.tsx"),
  appBuildIndexJs: resolveApp("src/lib/index.ts"),
  appPackageJson: resolveApp("package.json"),
  appDevSrc: resolveApp("src"),
  appBuildSrc: resolveApp("src/lib"),
  yarnLockFile: resolveApp("yarn.lock"),
  testsSetup: resolveApp("src/demo/setupTests.ts"),
  appNodeModules: resolveApp("node_modules"),
  appTsConfig: resolveApp("tsconfig.json"),
  appTsProdConfig: resolveApp("tsconfig.prod.json"),
  appTsLint: resolveApp("tslint.json"),
  publicUrl: getPublicUrl(resolveApp("package.json")),
  servedPath: getServedPath(resolveApp("package.json")),
};

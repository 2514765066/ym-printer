const {
  useGiteeReleases,
  useGithubReleases,
  getLatest,
} = require("ym-publish");
const { version, name } = require("../package.json");
const { join } = require("path");
const fs = require("fs");

const { GITEE_TOKEN, GH_TOKEN } = process.env;

const giteeRelease = useGiteeReleases({
  token: GITEE_TOKEN,
  repo: name,
  owner: "yxingyus",
});

const githubRelease = useGithubReleases({
  token: GH_TOKEN,
  repo: name,
  owner: "2514765066",
});

//获取更新内容
const getDoc = version => {
  const url = join(__dirname, "../release-note.md");

  const doc = fs.readFileSync(url).toString();

  const reg = new RegExp(`## ${version}([\\s\\S]*?)##`);

  const match = doc.match(reg);

  return match ? match[1].trim() : "";
};

const main = async () => {
  const body = getDoc(version);

  const filePath = join(__dirname, `../dist/${name}-${version}.exe`);

  const latestFile = getLatest({
    path: filePath,
    version,
  });

  await giteeRelease({
    version,
    body,
    filepaths: [latestFile, filePath],
  });

  await githubRelease({
    version,
    body,
    filepaths: [latestFile, filePath],
  });
};

main();

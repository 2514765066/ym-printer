import { useGiteeReleases, useGithubReleases, getLatest } from "ym-publish";
import { version, name } from "../package.json";
import { join } from "path";
import { readFileSync } from "fs";
import { cwd } from "process";

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
  const url = join(cwd(), "../release-note.md");

  const doc = readFileSync(url).toString();

  const reg = new RegExp(`## ${version}([\\s\\S]*?)##`);

  const match = doc.match(reg);

  return match ? match[1].trim() : "";
};

const main = async () => {
  const body = getDoc(version);

  const filePath = join(cwd(), `../dist/${name}-${version}.exe`);

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

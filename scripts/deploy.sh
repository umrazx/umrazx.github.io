#!/usr/bin/env bash
# Build the site and publish dist/ to the gh-pages branch (GitHub Pages source).
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build
touch dist/.nojekyll   # keep GitHub Pages from ignoring the _astro/ folder

WT=.deploy
git fetch -q origin gh-pages
rm -rf "$WT"; git worktree prune
git worktree add -q -B gh-pages "$WT" origin/gh-pages
trap 'git worktree remove --force "$WT" >/dev/null 2>&1 || true' EXIT

git -C "$WT" rm -rq --ignore-unmatch .
cp -R dist/. "$WT"/
git -C "$WT" add -A
if git -C "$WT" diff --cached --quiet; then
  echo "Nothing changed, skipping deploy."
  exit 0
fi
git -C "$WT" commit -qm "Deploy $(git rev-parse --short HEAD)"
git -C "$WT" push -q origin gh-pages
echo "Deployed to gh-pages."

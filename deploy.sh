#!/bin/bash

# Build the project
echo "Building project..."
pnpm build

# Navigate to dist folder
cd dist

# Initialize git if not already
if [ ! -d .git ]; then
  git init
  git checkout -b gh-pages
fi

# Add all files
git add -A

# Commit
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
echo "Deploying to GitHub Pages..."
git push -f git@github.com:yourusername/xmas-mad-libs.git gh-pages

cd ..

echo "Deployed successfully!"
echo "Your site will be available at: https://yourusername.github.io/xmas-mad-libs/"

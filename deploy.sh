echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* root@104.248.3.238:/var/www/baroka/

echo "Done!"

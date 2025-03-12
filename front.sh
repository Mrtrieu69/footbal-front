# Cài đặt nodejs v20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone frontend từ git
cd football-ai
git clone https://github.com/Mrtrieu69/footbal-front

# Run project
cd footbal-front
npm install
sudo chmod -R a+w /usr/lib
sudo npm install -g vite

npm run dev
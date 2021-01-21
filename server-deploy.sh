#!/bin/bash
# Kill all node processes
NODE=`ps -ef |grep node |grep -v 'grep' | awk '{print $2}'`
for proc in $NODE; do kill $proc; done;
# Prepare aesir-wolf-pack
cd aesir-wolf-pack;
npm i;
rm -rf build;
tsc ./app.ts;
rm -rf /opt/bots/production/aesir-wolf-pack;
mkdir /opt/bots/production/aesir-wolf-pack;
mkdir build;
mv ./app.js build;
cp build/app.js /opt/bots/production/aesir-wolf-pack/awp.js;
cp package.json /opt/bots/production/aesir-wolf-pack/package.json;
cp package-lock.json /opt/bots/production/aesir-wolf-pack/package-lock.json;
cd ..;

# Prepare ore-bot
cd ore-bot;
npm i;
rm -rf build;
tsc ./app.ts;
rm -rf /opt/bots/production/ore-bot;
mkdir /opt/bots/production/ore-bot;
mkdir build;
mv ./app.js build;
cp build/app.js /opt/bots/production/ore-bot/obt.js;
cp package.json /opt/bots/production/ore-bot/package.json;
cp package-lock.json /opt/bots/production/ore-bot/package-lock.json;
cd ..;

# Prepare fighter-bot
cd fighter-bot;
npm i;
rm -rf build;
tsc ./app.ts;
rm -rf /opt/bots/production/fighter-bot;
mkdir /opt/bots/production/fighter-bot;
mkdir build;
mv ./app.js build;
cp build/app.js /opt/bots/production/fighter-bot/fbt.js;
cp package.json /opt/bots/production/fighter-bot/package.json;
cp package-lock.json /opt/bots/production/fighter-bot/package-lock.json;
cd ..;

# Prepare orders-bot
cd orders-bot;
npm i;
rm -rf build;
tsc ./app.ts;
rm -rf /opt/bots/production/orders-bot;
mkdir /opt/bots/production/orders-bot;
mkdir build;
mv ./app.js build;
cp build/app.js /opt/bots/production/orders-bot/ord.js;
cp package.json /opt/bots/production/orders-bot/package.json;
cp package-lock.json /opt/bots/production/orders-bot/package-lock.json;

cd /opt/bots/production/aesir-wolf-pack;
npm i;
nohup node awp.js &
cd ../ore-bot;
npm i;
nohup node obt.js &
cd ../orders-bot;
npm i;
nohup node ord.js &
cd ../fighter-bot;
npm i;
nohup node fbt.js &
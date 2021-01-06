#!/bin/bash

# Kill all node processes
NODE=`ps -ef |grep node |grep -v 'grep' | awk '{print $2}'`
for proc in $NODE; do kill $proc; done;

# Prepare aesir-wolf-pack
cd aesir-wolf-pack;
npm i;
tsc .;
mkdir /opt/bots/production/aesir-wolf-pack;
cp build/app.js /opt/bots/production/aesir-wolf-pack/awp.js;
cp package.json /opt/bots/production/aesir-wolf-pack/package.json;
cp package-lock.json /opt/bots/production/aesir-wolf-pack/package-lock.json;
cd ..;

# Prepare industry-bot
cd industry-bot;
npm i;
tsc .;
mkdir /opt/bots/production/industry-bot;
cp build/app.js /opt/bots/production/industry-bot/inb.js;
cp package.json /opt/bots/production/industry-bot/package.json;
cp package-lock.json /opt/bots/production/industry-bot/package-lock.json;

cd /opt/bots/production/aesir-wolf-pack;
npm i;
nohup node awp.js &

cd ../industry-bot;
npm i;
nohup node inb.js &

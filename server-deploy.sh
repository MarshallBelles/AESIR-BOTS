#!/bin/bash
# Kill all node processes
NODE=`ps -ef |grep node |grep -v 'grep' | awk '{print $2}'`
for proc in $NODE; do kill $proc; done;

cd aesir-wolf-pack;
npm i;
cd ../fighter-bot;
npm i;
cd ../orders-bot;
npm i;
cd ../ore-bot;
npm i;

cd ..
nohup ts-node aesir-wolf-pack/app.ts &
nohup ts-node fighter-bot/app.ts &
nohup ts-node orders-bot/app.ts &
nohup ts-node ore-bot/app.ts &
echo;
echo "Done!";
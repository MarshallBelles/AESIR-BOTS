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

cd ../aesir-wolf-pack;
nohup npm run prod &
cd ../fighter-bot;
nohup npm run prod &
cd ../orders-bot;
nohup npm run prod &
cd ../ore-bot;
nohup npm run prod &
echo;
echo "Done!"
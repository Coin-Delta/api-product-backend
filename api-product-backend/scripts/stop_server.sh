#!/bin/bash
# sudo su
pm2_list=$(pm2 list)

if [[ $pm2_list == *"online"* ]]; then
  echo "Stopping existing PM2 process..."
  pm2 delete server
fi

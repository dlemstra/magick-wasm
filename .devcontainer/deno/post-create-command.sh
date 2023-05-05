#!/bin/bash

apt update
apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

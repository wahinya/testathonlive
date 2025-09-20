## Run this coomand on the root folder:

npm i

## To execute the test:

npx browserstack-node-sdk playwright test --config=playwright.bs.config.js

Note:
I shared a link to th browserstack reports since the account used do not have share public permission.
You need a .env file that has the secrets

## Images of the runs

Since my user is restricted from sharing the rports on public I have attached imags instead.
![alt text](<Screenshot 2025-09-22 at 14.37.07.png>) ![alt text](<Screenshot 2025-09-22 at 14.36.21.png>) ![alt text](<Screenshot 2025-09-22 at 14.37.02.png>) ![alt text](<Screenshot 2025-09-22 at 14.36.48.png>)

## .env

BROWSERSTACK_USERNAME= <your username>

BROWSERSTACK_ACCESS_KEY=<your access key>

APP_URL=https://testathon.live/

DEMO_USER_NAME=demouser
DEMO_USER_PASS=testingisfun99

IMAGE_USER_NAME=image_not_loading_user
IMAGE_USER_PASS=testingisfun99

FAV_USER_NAME=fav_user
FAV_USER_PASS=testingisfun99

BUILD_NAME=QA-testathon-live

## email

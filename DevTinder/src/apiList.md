# API LIST

## AuthRouter
1. POST/signin
2. POST/login
3. POST/logout

## profileRouter
GET/profile/view
PATCH/profile/edit
PATCH/profile/password

## ConnectionRequestRouter
POST/request/send/interested/:userId
POST/request/send/ignore/:userId
POST/request/review/accepted/:requestId
POST/request/review/rejected/:requestId

## userRouter

GET/user/connection
GET/user/request
GET/user/feed
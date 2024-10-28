# Dev tinder API's
## Auth Router
-POST /signup
-POST /login
-POST /logout

## Profile Router
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## Connection Request Router
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## user Router 
-GET /user/connections
-GET /user/requests
-GET /user/feed

status : ignore,interested,accepted,rejected

## post
-POST - post/create
-GET - post/read/:id
-PATCH - post/update/:id
-DELETE - post/delete/:id
-GET - post/feed
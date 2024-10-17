# Task - 1

Create a repository
Initialize the repository
node_modules, package.json, package-lock.json
Install express
Create a server
Listen to port 7777
Write request handlers for /test , /hello
Install nodemon and update scripts inside package.json
What are dependencies
What is the use of "-g" while npm install
Difference between caret and tilde ( ^ vs ~ )

# Task-2

Initailize git 
.gitignore
create remote repo in github
push all the code to remote origin
Play with routes & route extensions
Order of routes matter a lot
Write logic to handle GET,POST,PATCH,DELETE API's and test them on postman
Explore routing using ?,+,*, and regex
Read Query params & Dynamic routes

# Task - 3
Multiple route handlers
next()
next() and errors along with res.send()
app.use('/',rh1,[rh2,rh3],[rh4,rh5,rh6],rh7) 
What is middleware & why do we need it
how express handles request behind the scenes
app.use() vs app.all()
Write a dummy middle for adminAuth
Write a dummy middle for all user routes, except login
Error handle using wildcard error handling or try catch

# Task - 4
create a free cluster
Install mongoose
connect application to mongo database (devtinder)
connect to db before starting application
Create user schema
create User model
create POST /signup api to add data to db
create some documents in db using postman 
Error handling using try,catch 

# Task-5
Difference between JS object & JSON
User.findOne() if it has duplicates.which one will the result.
API /user - GET - get user by email
API /feed - GET - get all users
API /userId -get user by ID
API /user - DELETE - delete user from db
Difference b/w PATCH & PUT
API /user -PATCH - Update user data
Explore Mongoose docs for Model

# Task-6
Add fields - photoURl[string],about:string,skills[string]
Validation for all the fields
Explore schema types from docs.
required,unique,lowercase,min,minlenth,maxLength,trim
Add default
Create a custom validatior function
Imporve DB scema -All all appropriate validators
Add timeStamps
API Level validations on POST,PATCH,PUT methods
Data sanitization - Add API validation for each field
Install validator.js and explore validator functions
Never trust req.body - beacause attackers may exploit the db from API level

# Task-7
Validate data of signup
Install Bcrypt package
create a password hash and store it in users collection

# Task-8
Install cookie parser
send dummy cookie to user
GET /profile - check the cookie back using res.cookie()
Install jsonwebtoken
/login After email & password validation create JWT token and attach it inside cookie and sent it to user
/profile - read cookie and  get the user data.

userAuth middleware
add user Auth middleware in profile & new /sendConnectionRequest -POST
Expire token,cookies in 1 day.
create a mongoose schema methods for creating JWT
create a mongoose schema for checking user credentials

# Task -9
-Explore Tinder for API's
## List of API's for DevTinder

### Auth Router
-POST /signup
-POST /login
-POST /logout

### profile Router
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

### Connection Router
-POST request/send/interested/:requestId
-POST request/send/igonred/:requestId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

### user Router
-GET /user/feed
-GET /user/requests
-GET /user/connections
-Delete /user/delete

-Explore express.Router() & implement the same in project
# connecting to db

1. creating a folder named database and writing a function to connect a db.

# creating a user model and schema

1. creating a new folder named models.
2. create a file named user.js then create a schema and then model and export it.

# creating a route or an api 

1. in app folder create a api folder in it register folder in it a route.js file
2. create a asynce function call inside db connection
3. destructure name, email, password from req
4. validate schema with joi 
5. passsing the dynamic property from the next js. you can checkout the docs for it.
6. validate schema
7. check user exist and creating user by hashing password.

# createing services file -- it is basically all the api calling logic at one place 

1. create a services folder inside it register folder inside it a index.js file
2. here call the api route.
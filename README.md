## REGISTERATION FUNCTIONALITY

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

# lets intigrate registration api with frontend 

## LOGIN FUNCTIONALITY

1. creating route api for login
2. create login service file
3. sending the form data and calling the api from page of login folder
4. set context authUser and userDetail and use these in the login page and we will storing the token in the cookies and user info in the localstorage
5. in context use useEffect and fetch the data from the cookie and localstorage.

## Creating the backend for the new product addition

1. create model schema, then create api route, then create services file.

# Integrate firebase 

1. create firebase new project and then it will give you the firebase sdk.
2. from sdk you can copy firebaseConfig and paste it in the utils index.js
3. from sdk copy intializeApp and paste it in the admin-view > add-proucts > page.js and import initializeApp

4. In firebase :- go to console > Build > storage > get started > start in test mode > copy the link.
5. go the utils index.js and store it variable and export it.
6. in page.js make variable name storage and use getStorage function from firebase and pass it the storageURl


## Fetching all products from database

note: when we making the get request then we need to give absolute url "api/dummy" is not working we need to give full url in case of get request.

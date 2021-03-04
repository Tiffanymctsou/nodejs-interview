## Node.js Interview Coding Test

-  Test Accounts
	- account#1
		- account: test001
		- password: test001
	- account#2
		- account: test002
		- password: test002

If you wish to create an account, a `POST API` is provided: `/register`

**Request data format**

    {
	    "name":  "yourName",
	    "account":  "yourAccount",
	    "password":  "yourPassword"
    }


## How to run

1. Clone / Pull the latest repository
2. `npm install` all the packages
3. Create database with `to_do_list.sql`
4. Set up `.env` file
>     // DATABASE
>     LOCAL_DB_HOST = localhost
>     LOCAL_DB_USER = your_user
>     LOCAL_DB_PWD = your_password
>     LOCAL_DB = to_do_list
>     
>     // HASH
>     BCRYPT_SALT = 10
>     JWT_SECRET = todolist
>     TOKEN_EXPIRE = '10m'
5. `node / nodemon server.js`
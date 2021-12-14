# Installation

* Values between **[**...**]** must be replaced with your own !

## MySQL
```
# Create a mysql database & grant all access(1)

# Follow Backend & Frontend steps ↓

# Once you will have created user(s) (with the signup form)
# use your SQL cli to add admin powers with this statement
UPDATE users SET admin = 1 WHERE name = '[your_user_name]';
```

## Backend
```
cd backend

# Create the .env file,
# then in this file add :
MYSQL_DB_NAME="[your_mysql_database_name]"
MYSQL_USER="[your_mysql_username]"
MYSQL_PWD="[your_mysql_user_password]"
JWT_KEY="[with_the_value_you_want]"

# Install dependencies + start server
npm install
npm start
```

## Frontend
```
cd frontend

# Install dependencies + start server
npm install
ng serve --open
```

### References
1. [how to create a new user and grant permissions in mysql](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql)

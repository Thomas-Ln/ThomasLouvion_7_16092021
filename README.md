# Installation

## Backend
```
cd backend

# Set Database
# create a mysql database & grant all access(1)

# Set Environment
touch .env
# in this file add :
MYSQL_DB_NAME="[your_mysql_database_name]"
MYSQL_USER="[your_mysql_username]"
MYSQL_PWD="[your_mysql_user_password]"
JWT_KEY="[with_the_value_you_want]"

# Create images/ folder ( will contain uploaded images )
mkdir images

# Install dependencies
npm install

# Start Server
npm start

```

## Frontend
```
cd frontend
ng serve --open
```

### References
1. [how to create a new user and grant permissions in mysql](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql)

# Installation

## Backend
```
cd backend

# Set Database
# create a mysql database & grant all access(1)
# import tables in database
mysql -u [your_username] -p [your_database_name] < database.sql

# Set Environment
touch .env
# in this file add :
MYSQL_DB_NAME="[your_database]"
MYSQL_USER="[your_username]"
MYSQL_PWD="[your_user_password]"

# Install dependencies
npm install

# Start Server
npm start

```

### References
1. [how to create a new user and grant permissions in mysql](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql)

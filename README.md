# fastify-api-boilerplate
Fastify framework based backend api for NodeJs application

**Description**
* fastify framework based backend api application
* boom for error detailing
* mongodb database
* rabbitMQ producer and consumer support - ~~Currently RabbitMQ connection method is commnented while setting up server in app.js~~
* rabbitMQ auto re-connectivity logic after RabbitMQ is down from application
* configurations are in .config.json and local configuration can be override in .config.override.json

#
**Install dependencies:**
* yarn install

#
**Test application:**
* yarn test

#
**Build/Run application:**
* yarn start (for production environment) **/**
* yarn dev (for development environment)

#
**Application health status:**
* information about the application and its health status

**Get:**
```
http://localhost:7001/keep-alive
http://localhost:7001/ping
http://localhost:7001/version
http://localhost:7001/health
```

##
**Post:**
```
http://localhost:7001/v1/student
```
**Sample Body**
######
```
{
	"firstName": "Danish",
	"lastName": "Siddiq",
	"registrationNumber": 1234567
}
```

#

**Get:**
```
http://localhost:7001/v1/student/:id
```

id is the mongodb _id (unique id) to fetch data
#


**Improvements:**

It is still in progress, feel free to add further features into it


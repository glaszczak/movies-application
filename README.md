<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Prerequisites

- [Docker](https://www.docker.com) installed on your computer

- Clone [this](https://github.com/glaszczak/movies-application) repository

# Development

## Setup environment

Create `.env` files in the root directory of both services (`auth-service` and `movies-service`) based on the `.env.example` file.

## Run the application

To start development environment:

- Start Docker application on your computer

- In the root directory or the repository run command: `make start`

You can also use other commands to automate the development:
- `make restart_app` - to restart the application
- `make restore_db` - to restore the database and restart the application

## API

To test the API you can use OpenAPI by running the application and go to the url `localhost:3000/api`

Or do it manually:

### 1. Login user 

To get your JWT token from Authorization Service:

`POST` request on `localhost:3000/auth/login`

Use one of the following credentials in the body section of your request:
```json
{
  "username": "basic-thomas",
  "password": "sR-_pcoow-27-6PAwCD8"
},
{
  "username": "premium-jim",
  "password": "GBLtTyq3E_UNjFnpo9m6"
}
```

### 2. Add movie for user

`POST` request on `localhost:3000/movies`

Use body formatted with JSON as follows:
```json
{  
  "title": "Title"
}
```
⚠️ Add received token in the authentication section of your request.

### 3. List movies for user
`GET` request on `localhost:3000/movies`

⚠️ Add received token in the authentication section of your request.

# Source

- Authorization service is provided by: https://github.com/netguru/nodejs-recruitment-task/tree/master

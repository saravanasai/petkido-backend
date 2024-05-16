
# Petkido backend 

A backend service for new gen social media for pet lovers


## Setup

Clone the project

```bash
  git clone https://github.com/saravanasai/petkido-backend.git
```

Go to the project directory

```bash
  cd petkido-backend
```
Rename .env.example  - .env

```bash
# App configuration
APP_MODE=local
APP_PORT=8000
MONGODB_URI=mongodb://mongodb:27017/
MONGODB_NAME=petkido


# Cros origin
CORS_ORIGIN=*

# Mail configuration 
MAILTRAP_SMTP_HOST=
MAILTRAP_SMTP_PORT=
MAILTRAP_SMTP_USER=
MAILTRAP_SMTP_PASS=
```

Install docker & start docker engine

```bash
  docker compse up -d
```

Hit health check API

```bash
  http://localhost:8000/api/v1/healthcheck
```


## Authors

- [@Saravana Sai](https://github.com/saravanasai)


# Workstation Booking

## Steps

- Copy `.env.example` as `.env` then replace the settings in the `.env` file.
- Run the `init.sql` file.


# Docker compose & Heroku Manual

## Docker compose

  - Make shure your Docker app is ready
  - Build the Docker images 
    - Navigate to the folder where the Dockerfile is (backend / frontend)
    - Run Dockerfile ` docker build . -t "app/<current folderName>" `
  - Run docker compose
    - Navigate to project root where the docker-compose.yaml is
    - Run ` docker compose up -d `


## Heroku

  - Make shure You have the Heroku CLI and You are logged in
    - https://devcenter.heroku.com/articles/heroku-cli
  - Switch to the right Heroku project
    - ` heroku git:remote rubberduckers `
  - After merging to development, push to Heroku
    - ` heroku container:push --recursive `
    - ` heroku container:release --recursive `
    - ` heroku scale backend=1 `
    - ` heroku scale frontend=1 `
## Heroku logs
  
    - ` heroku logs --tail `

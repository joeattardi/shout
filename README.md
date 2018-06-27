# Shout

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

# Setup

## Set up environment
Copy the file `env.sample` to a file called `.env` and set the following environment variables:

 - `LOG_LEVEL`: The logging level to use
 - `PORT`: The port for the server to listen on
 - `JWT_PRIVATE_KEY`: The private key used to sign JWTs (see below)

## Generate a JWT key
shout uses JSON Web Tokens (JWTs) for authentication. These require a key to sign them with. To generate a key to use for signing the JWTs, run the following commands. Note: Passphrases aren't supported yet, so don't create a passphrase.

    $ ssh-keygen -t rsa -b 4096 -f jwtRS256.key
    $ openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

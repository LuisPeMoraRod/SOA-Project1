# SOA - Project 1

RESTful API used as a food-pairing engine

## How to run app in local environment

Run the following command inside root folder (where `package.json` file is located).

1. Install dependencies:

```
npm install
```

2. Run in development mode (using [nodemon](https://nodemon.io/)). This allows automatic reload of the server with every new change in the code:

```
npm run dev
```
## How to build Docker image and spin up local container
1. Run the following command in the root directory. Change IMAGE_NAME for any name you want.
```
docker build -t IMAGE_NAME .
```
2. Run the container:
```
docker run -p 8080:8080 IMAGE_NAME
```

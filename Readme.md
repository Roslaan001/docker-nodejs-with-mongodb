This repo contains nodejs app and a dockerfile, To use, follow the steps below

##### Step 1: Clone the repo
```bash
https://github.com/Roslaan001/docker-nodejs-with-mongodb
cd docker-nodejs-with-mongodb
```

##### Step 2: Build the image
```bash
docker build -t <dockerusername>/<appname>:<versionnumber> .
```

##### Step 3: Push the image to docker registry (dockerhub)
```bash
docker push <dockerusername>/<appname>:<versionnumber>
```

##### Step 4: Run the one container (Nodejs) (This is optional)
```bash
docker run -p 3000:3000 <dockerusername>/<appname>:<versionnumber>
```

##### Step 5: Run the docker compose file
```bash
docker-compose up
```

##### Step 6: check your app and database
```bash
localhost:3000 - Nodejs app
localhost:8081 username: user password: pass -  mongodb/mongo-express
```

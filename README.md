// maintainer (1) notes 

1. Download docker
2. create backend\config\config.env and update the content from backend\config\config_sample_env.txt.
3. docker-compose up -d --build
4. visit localhost:8000

//first creator notes
# Plant-Ecommerce

an E-commerce Website built with MERN stack.

## Instructions

after cloning, run this command in the root folder
```bash
npm install
```
navigate to "frontend" folder, run these commands 
```bash
npm install
npm run build
```
wait for application build
after that open the backend/config/config.env
and update the MongoDB connection string
```bash
...
DB_LOCAL_URI=mongodb://localhost:27017/plantshop
```

navigate back to "root" folder and run this command for loading demo data
```bash
npm run seeder
```

run this below command to run the app in production mode
```bash
npm run prod
```


## Test
open the http://localhost:8000 and test the 
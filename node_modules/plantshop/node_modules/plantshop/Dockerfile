# Use an official Node.js image as a base
FROM node:18-bookworm-slim

# Set the working directory to /app
WORKDIR /app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .


# Expose the MongoDB port
EXPOSE 27017

RUN npm run seeder -v

CMD ["npm", "run","start"]


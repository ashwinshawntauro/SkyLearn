# Step 1: Use the official Node.js image as the base image
FROM node:22-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install -g prisma && npm install -g node-pre-gyp && npm i sharp && npm install --frozen-lockfile

# Step 5: Copy the entire project files into the container
COPY . .

# Step 6: Run prisma generate (ensure schema.prisma is available after copying the files)
RUN npm run prisma-generate

# Step 7: Build the Next.js app
RUN npm run build

# Step 8: Expose the port the app will run on
EXPOSE 3000

# Step 9: Start the Next.js app
CMD ["npm", "start"]

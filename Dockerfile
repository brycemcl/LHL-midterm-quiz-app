FROM node:12
RUN apt-get update && apt-get -y install postgresql postgresql-contrib 
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8080
CMD ["./project.sh"]
# CMD ["npm", "start"]

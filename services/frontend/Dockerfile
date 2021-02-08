FROM node:12-buster as build
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
COPY . .
RUN npm run build
FROM nginx
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
RUN chmod -R 555 /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
# RUN ls
# RUN cat /etc/nginx/nginx.conf

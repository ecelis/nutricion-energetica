FROM node:16-alpine3.15
WORKDIR /app
COPY . ./
RUN npm install --production
EXPOSE 3000
CMD npm start
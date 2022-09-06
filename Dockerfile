FROM node:16-alpine3.15
ARG NODE_ENV_ARG=production
ENV NODE_ENV=${NODE_ENV_ARG}
WORKDIR /app
COPY . ./
RUN npm install --omit=dev
EXPOSE 3000
CMD npm start
FROM node:alpine
WORKDIR /app
COPY package.json .
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . ./
EXPOSE $PORT
CMD ["npm", "run", "dev"]

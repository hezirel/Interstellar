FROM node:alpine
WORKDIR /app
COPY ./package*.json .
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi
COPY . .
EXPOSE $PORT
CMD ["/bin/sh", "entrypoint.sh"]

# Build frontend
FROM node:18 as build-frontend
WORKDIR /app
COPY ./client/package*.json ./
RUN npm install
COPY ./client/ .
RUN npm run build

# Build backend
FROM ruby:3.1.4 as build-backend
WORKDIR /app
COPY ./todo-api/Gemfile* ./
RUN bundle install
COPY ./todo-api/ .
RUN bundle exec rails assets:precompile

# Final stage
FROM nginx:stable-alpine
COPY --from=build-frontend /app/build /usr/share/nginx/html
COPY --from=build-backend /app /usr/share/nginx/html/api
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

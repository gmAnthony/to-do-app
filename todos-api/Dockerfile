FROM ruby:3.1.4

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

ENV RAILS_ENV production
ENV RACK_ENV production
ENV RAILS_LOG_TO_STDOUT=true
ENV RAILS_SERVE_STATIC_FILES true

EXPOSE 3000

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
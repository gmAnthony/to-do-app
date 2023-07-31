FROM ruby:3.1.4

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

RUN RAILS_ENV=production bundle exec rails

EXPOSE 3000

ENV RAILS_ENV production
ENV RACK_ENV production
ENV RAILS_SERVE_STATIC_FILES true

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
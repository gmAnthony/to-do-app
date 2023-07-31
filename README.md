# A simple to-do list application

I built this app as a demonstration of my ability to build a full-stack CRUD application. The
frontend is a Vite/React application using Firebase for authentication and deployed on Vercel. The
backend is a Rails API using PostgreSQL for the database and deployed on Fly.io.

## Frontend

I made the choice to use the Mantine UI library for this application as I didn't want to spend too
much time fiddling with CSS details and Mantine has excellent-looking components that are easy to
plug-and-play. Some details could certainly be refined a bit more, like the layout shift on editing
a todo and more thought placed into hierarchy inside the todo list. It also may make more sense to
add new tasks to the beginning of the list, instead of at the end.

Firebase was a good choice for authentication as handles user management very well with minimal lift.
I chose to use the email/password authentication method as it's the most straightforward to set up
and use. I also allowed anonymous sign ins to make it easier for people who are interested in
testing out the functionality of the application without creating an application. I used a provider
pattern to wrap the application in a Firebase context so that the Firebase SDK is only initialized
once and can be used throughout the application.

The tests I wrote are very basic and only really test that the components do what they're expected
to do. Further testing would include a more robust look at ensuring the components are not
misbehaving when given unexpected inputs, or that the components are rendering the correct elements.

## Backend

I chose to use Rails for the backend as it's a framework I'm familiar with and it's easy to set up
a new API. I used the `--api` flag when generating the Rails project to avoid generating unnecessary
files. I also chose to use PostgreSQL as the database as I'm also familiar with, it scales well and,
it's setting up a PostreSQL integration on Fly.io is straightforward.

The backend is quite simple, with only one model and controller. I chose to use the `status` field
on the Todo model to track whether a task is completed or not. This could be a boolean, given that
there are only two acceptable states, however could see a possibility of including more statuses and
therefore left it to be more easily extendable. I also chose to use the `user_id` field to track
which user created a task. This could be used to implement a feature where users can share tasks
with each other, or to implement a feature where users can assign tasks to each other.

## Tasks

In order to organize my efforts in creating this application I created a list of tasks to complete
and checked them off as I went. I largely kept to the list, but deviated a little in terms of
frontend design. The list is as follows:

- [x] **Set up Firebase project**

  - [x] Create a new project in Firebase
  - [x] Enable required authentication method (Email/Password, Google, Facebook etc.)
  - [x] Obtain Firebase configuration details

- [x] **Create a React frontend with Firebase**

  - [x] Initialize a new React project with Vite
  - [x] Install and configure Firebase SDK
  - [x] Create components
    - [x] App (including Firebase initialization)
    - [x] UserAuthForm (for both login and registration)
    - [x] TodosList
    - [x] TodoItem
    - [x] TodoForm
    - [x] Header
  - [x] Implement user registration and login using Firebase
  - [x] Implement user logout
  - [x] Implement CRUD operations for to-dos (interact with Rails backend)

- [x] **Create a Rails backend API**

  - [x] Generate a new Rails API
  - [x] Create Todo model with required fields (`title: string`, `description: string`, `staus: string`, `user_id: string`)
  - [x] Create Todos controller with necessary actions (Create, Read, Update, Delete)
  - [x] Set up routes for Todos
  - [x] Set up Firebase JWT token verification for authenticated requests
  - [x] Implement necessary logic in controller actions (verify user ID from Firebase JWT token)

- [x] **Integration and testing**

  - [x] Ensure frontend can successfully communicate with backend (CORS setup)
  - [x] Test all functionalities manually
  - [x] Write tests

- [x] **Deployment**
  - [x] Dockerize the Rails API
  - [x] Deploy Rails API
  - [x] Build React application for production
  - [x] Deploy frontend application (Vercel)

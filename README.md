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

- [ ] **Deployment**
  - [ ] Dockerize the Rails API
  - [ ] Deploy Rails API
  - [ ] Build React application for production
  - [ ] Deploy frontend application (many options: Firebase Hosting, Netlify, Vercel, etc.)

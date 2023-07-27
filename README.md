- [x] **Set up Firebase project**

  - [x] Create a new project in Firebase
  - [x] Enable required authentication method (Email/Password, Google, Facebook etc.)
  - [x] Obtain Firebase configuration details

- [ ] **Create a React frontend with Firebase**

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
  - [ ] Implement session handling (storing Firebase JWT token and user data)
  - [x] Implement user logout
  - [ ] Implement CRUD operations for to-dos (interact with Rails backend)

- [ ] **Create a Rails backend API**

  - [ ] Generate a new Rails API
  - [ ] Create Todo model with required fields (`description: string`, `complete: boolean`, `user_id: string`)
  - [ ] Create Todos controller with necessary actions (Create, Read, Update, Delete)
  - [ ] Set up routes for Todos
  - [ ] Set up Firebase JWT token verification for authenticated requests
  - [ ] Implement necessary logic in controller actions (verify user ID from Firebase JWT token)

- [ ] **Integration and testing**

  - [ ] Ensure frontend can successfully communicate with backend (CORS setup)
  - [ ] Test all functionalities manually
  - [ ] Write tests

- [ ] **Deployment**
  - [ ] Dockerize the Rails API
  - [ ] Deploy Rails API
  - [ ] Build React application for production
  - [ ] Deploy frontend application (many options: Firebase Hosting, Netlify, Vercel, etc.)

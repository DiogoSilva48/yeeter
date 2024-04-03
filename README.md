# Yeeter

Twitter but better

## Technologies Used

- Frontend:

  - React Next.js
  - Tailwind CSS

- Backend:

  - Node.js
  - Express

- Database:
  - MongoDB

## Features Implemented

- User Authentication:

  - Login
  - Register

- Yeet Functionality:
  - Posting yeets (tweets) (backend)

## Features to be Implemented in the near future

- Frontend Homepage:

  - Display user profile
  - Display yeets from followed users

- Account Settings:
  - Change user information

## How to use

To get started with Yeeter, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies for both frontend and backend:
   ```
   cd frontend
   npm install
   ```
   ```
   cd backend
   npm install
   ```
4. Set up MongoDB and create a `.env` file in the backend folder with the following content:

   ```
   DB_URI=linktothedatabase
   ```

   Replace `linktothedatabase` with the URI of your MongoDB database. Make sure to configure the connection in the backend to use this URI.

5. Start the backend server:
   ```
   cd backend
   npm start
   ```
6. Start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```
7. Visit http://localhost:3000 in your web browser to view the application.

## Contributing

Contributions are welcome! If you have any ideas for features, find any bugs, or want to contribute in any way, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

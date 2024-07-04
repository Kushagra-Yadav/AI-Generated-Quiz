# 📚 Quiz Application

Welcome to the Quiz Application! This project allows users to create, manage, and take quizzes on various topics. It features a timer for quizzes and a results section that shows the user's score after submission.

## 🚀 Features

- **Create Quizzes**: Users can create quizzes with custom questions.
- **Take Quizzes**: Users can take quizzes and see their scores after submission.
- **Timed Quizzes**: Each quiz has a timer that automatically submits the quiz when time is up.
-  **History**: Stores the previous quizzes created.

## 🛠️ Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/yourusername/quiz-application.git
    cd Quiz
    ```

2. **Install dependencies:**

    For the backend:

    ```sh
    cd server
    npm install
    ```

    For the frontend:

    ```sh
    cd client
    npm install
    ```

3. **Start the backend server:**

    ```sh
    cd server
    npm run start
    ```

4. **Start the frontend application:**

    ```sh
    cd client
    npm run start
    ```

## 📂 Project Structure

```plaintext
quiz-application/
├── client/               # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── styles/       # CSS files
│   │   ├── index.js      # Entry point of the React application
│   └── package.json      # Frontend dependencies and scripts
├── server/               # Node.js backend application
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── index.js          # Entry point of the Node.js application
│   └── package.json      # Backend dependencies and scripts
└── README.md             # Project documentation

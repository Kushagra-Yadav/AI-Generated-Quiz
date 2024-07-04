import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import '../styles/AllTest.css';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate=useNavigate();
 const handleCreateQuiz=()=>{
  navigate('/createQuiz');
 }

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/getAllQuizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  if (quizzes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-list-container">
      <div className="header">
        <h1>Available Quizzes</h1>
        <button className="create-quiz-button" onClick={handleCreateQuiz}>
          Create Quiz
        </button>
      </div>
      <ul className="quiz-list">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="quiz-item">
            <Link to={`/quiz/${quiz._id}`}>
              <div className="quiz-content">
                <h2>{quiz.subject}</h2>
                <p>Number of Questions: {quiz.numberOfQuestions}</p>
                <p>Difficulty: {quiz.difficulty}</p>
                <p>Topics: {quiz.topics.join(', ')}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;

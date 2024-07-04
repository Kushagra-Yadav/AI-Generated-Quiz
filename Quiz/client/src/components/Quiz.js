import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Quiz.css';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBar from './Loading';

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState();
  const [timeLeft, setTimeLeft] = useState(0);
  const { quizCode } = useParams();
  const [topic,setTopic]=useState("");
  const navigate=useNavigate();
  const handleHome=()=>{
   navigate('/');
  }
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/getQuiz/${quizCode}`);
        const temp= response.data.subject;
        setTopic(temp);
        setIsSubmitted(false);
        const data = response.data.generatedQuiz.questions;
        console.log(data);

        setQuizData(data); // Set quiz data directly to questions array

        setAnswers(Array(data.length).fill(null)); // Initialize answers array

        // Calculate total time from hours and minutes
        setTimeLeft(parseInt(response.data.hours) * 60 * 60 + parseInt(response.data.minutes) * 60);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [quizCode]);

  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleOptionChange = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
  
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setIsSubmitted(() => true); // Automatically submit quiz when time is up
    }
  }, [timeLeft, isSubmitted]);
  
  const handleSubmit = () => {
    setIsSubmitted(true); // Manually submit quiz
  };

    const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!quizData) {
    return <LoadingBar/>;
  }

  // Calculate correct answers
  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      if (answer !== null && quizData[index].options[answer] === quizData[index].answer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  return (
    <div className="quiz-container">
      <h1>{topic}</h1>
      <div className="timer">
        <p>Time Left: {formatTime(timeLeft)}</p>
      </div>
      {!isSubmitted ? (
        <div>
          <div className="question-section">
            <h2>{`Q ${currentQuestion+1}. `}{quizData[currentQuestion].question}</h2>
            <div className="options-section">
              {quizData[currentQuestion].options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="option"
                    value={option}
                    checked={answers[currentQuestion] === index}
                    onChange={() => handleOptionChange(index)}
                  />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button onClick={handleNextQuestion} disabled={currentQuestion === quizData.length - 1}>
              Next
            </button>
          </div>
          {currentQuestion === quizData.length - 1 && (
            <div className="submit-button">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </div>
      ) : (
        <div className="results-section">
          <h2>Results</h2>
          <p>You have completed the quiz!</p>
          <p>Correct Answers: {calculateScore()} / {quizData.length}</p>
          <button onClick={handleHome}>Back to home</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;

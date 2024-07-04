import React from 'react'

export default function Result({ quizData, answers, onHomeClick }) {
  const correctAnswers = answers.filter((answer, index) => answer !== null && quizData[index].options[answer] === quizData[index].correctAnswer).length;

  return (
    <div className="results-section">
      <h2>Results</h2>
      <p>You have completed the quiz!</p>
      <p>Correct Answers: {correctAnswers} / {quizData.length}</p>
      <button onClick={onHomeClick}>Home</button>
    </div>
  );
}

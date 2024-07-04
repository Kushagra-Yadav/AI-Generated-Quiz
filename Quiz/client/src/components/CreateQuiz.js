import React, { useState } from 'react';
import "../styles/CreateQuiz.css";
import {  useNavigate } from 'react-router-dom';
import LoadingBar from './Loading';

export default function CreateQuiz() {

  const [formData, setFormData] = useState({
    numberOfQuestions: '',
    subject: '',
    difficulty: 'medium',
    hours: '',
    minutes: '',
    topics: []
  });
 const [loading,setLoading]=useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [quizData, setQuizData] = useState(null);
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleHome=()=>{
    navigate('/');
  }
  const handleTopicChange = (e) => {
    setNewTopic(e.target.value);
  };

  const addTopic = () => {
    if (newTopic.trim() !== '') {
      setFormData({
        ...formData,
        topics: [...formData.topics, newTopic.trim()]
      });
      setNewTopic('');
    }
  };

  const removeTopic = (index) => {
    const updatedTopics = [...formData.topics];
    updatedTopics.splice(index, 1);
    setFormData({
      ...formData,
      topics: updatedTopics
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const response = await fetch('http://127.0.0.1:5001/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formData })
      });
      const data = await response.json();
      setLoading(false);
      setQuizData(data.result);
      console.log(data.result);
      const quizCode=data.result._id;
      console.log(quizCode);
      navigate(`/quiz/${quizCode}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  if(loading){
    return <LoadingBar/>
  }
  return (
    <div className="input-form-container">
      <h2>Test Configuration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Questions:
          <input
            type="number"
            name="numberOfQuestions"
            value={formData.numberOfQuestions}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Difficulty:
          <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <div className="topics-input">
          <label>
            Topics:
            <input
              type="text"
              value={newTopic}
              onChange={handleTopicChange}
              placeholder="Add a topic"
              
            />
            <button type="button" onClick={addTopic}>Add</button>
          </label>
          <ul className="topics-list">
            {formData.topics.map((topic, index) => (
              <li key={index}>
                {topic}
                <button type="button" onClick={() => removeTopic(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <label>
          Test Duration:
          <input
            type="number"
            name="hours"
            placeholder="Hours"
            value={formData.hours}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="minutes"
            placeholder="Minutes"
            value={formData.minutes}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Start Test</button>
        <button onClick={handleHome}>Home</button>
      </form>
      
      {quizData && (
        <div className="quiz-result">
          <h3>Generated Quiz</h3>
          <pre>{quizData}</pre>
        </div>
      )}
    </div>
  );
}

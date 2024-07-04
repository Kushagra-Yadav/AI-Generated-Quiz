import React, { useRef, useState } from 'react'
import '../styles/Home.css'
import { useNavigate} from 'react-router-dom'
export default function Home() {
  const usernameRef = useRef(null);
  const [username,setUsername]=useState("");
  const navigate=useNavigate();
  const handleCreateQuiz=(e)=>{
    e.preventDefault();
    const userName=usernameRef.current.value;
    setUsername(userName);
    console.log(userName);
    navigate('/createQuiz');
  }
  const handleHistory=()=>{
    navigate('history');
  }
  return (
    <div className="quiz-container">
    <h1>Quiz Instructions</h1>
    <ol>
        <li> You will be asked 10 questions one after another.</li>
        <li> 10 points is awarded for the correct answer.</li>
        <li> Each question has three options. You can choose only one options.</li>
        <li> You can review and change answers before the quiz finish.</li>
        <li> The result will be declared at the end of the quiz.</li>
    </ol>
    <form onSubmit={handleCreateQuiz}> 
    <label >Enter Username:</label>
    <input type="text" id="username" name="username" ref={usernameRef} required/>
      <button type="submit">Create Quiz</button>
      {username.length>0 &&  <button onClick={handleHistory}>History</button>}
    </form>

</div>
  )
}


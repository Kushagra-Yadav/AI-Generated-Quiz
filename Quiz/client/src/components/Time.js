import React from 'react'
import { useState,useEffect } from 'react';
export default function Time({handleSubmit}) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const formattedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  // Countdown timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);
  return (
    <div className="timer">
        Time left: {formattedTime}
      </div>
  )
}

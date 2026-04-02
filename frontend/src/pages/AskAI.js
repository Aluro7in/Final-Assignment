import React, { useState } from 'react';
import axios from 'axios';

function AskAI() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    const res = await axios.post('http://localhost:5000/ask', { question });
    setAnswer(res.data.answer);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Ask MealMind AI</h1>
      <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What’s on your mind?" />
      <button onClick={handleAsk}>Ask</button>
      {answer && <p>{answer}</p>}
    </div>
  );
}

export default AskAI;
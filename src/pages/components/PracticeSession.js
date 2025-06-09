import { useState, useEffect } from 'react';

export default function PracticeSession() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Simulate AI question fetch
    setQuestion("Tell me about a time you overcame a challenge.");
  }, []);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    // Simulated feedback generation
    setFeedback("✅ Good response! Try to include specific results or numbers next time.");
  };

  return (
    <div className="interview-card" style={{ marginTop: '80px', marginBottom: '60px' }}>
      <div className="question-section">
        <label className="question-label">Interview Question</label>
        <p className="question-text">{question}</p>
      </div>

      <div className="answer-section">
        <label className="answer-label">Your Answer</label>
        <textarea
          className="answer-textarea"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
        />
      </div>

      <div className="submit-section">
        <button className="submit-button" onClick={handleSubmit} disabled={!answer.trim()}>
          Submit Answer
        </button>
      </div>

      {feedback && (
        <div className="feedback-section">
          <div className="feedback-title">Feedback</div>
          <div className="feedback-content">
            <p>{feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
}

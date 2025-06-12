import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function PracticeSession() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setQuestion("Tell me about a time you overcame a challenge.");
  }, []);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    
    setLoading(true);
    setError('');
    setFeedback(''); // Clear previous feedback
    
    try {
      const res = await fetch('/api/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Give feedback on this answer for a job interview: ${answer}` })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setFeedback(data.choices?.[0]?.message?.content || "No feedback received.");
    } catch (err) {
      console.error('Error getting feedback:', err);
      setError("Failed to get feedback. Please try again.");
    } finally {
      setLoading(false);
    }
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
        <button 
          className="submit-button" 
          onClick={handleSubmit} 
          disabled={!answer.trim() || loading}
        >
          {loading ? 'Analyzing...' : 'Submit Answer'}
        </button>
      </div>
      {error && (
        <div className="error-section">
          <p className="error-message">{error}</p>
        </div>
      )}
      {feedback && (
        <div className="feedback-section">
          <div className="feedback-title">Feedback</div>
          <div className="feedback-content">
            <ReactMarkdown>{feedback}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from 'react';

export default function ProgressTracker() {
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('sessions');
    if (stored) setSessions(parseInt(stored));
  }, []);

  const incrementSessions = () => {
    const newCount = sessions + 1;
    setSessions(newCount);
    localStorage.setItem('sessions', newCount);
  };

  return (
    <div className="interview-card" style={{ marginBottom: '100px' }}>
      <h2 className="practice-title">Your Progress</h2>
      <p className="practice-subtitle">Sessions Completed: <strong>{sessions}</strong></p>
      <div className="submit-section">
        <button className="submit-button" onClick={incrementSessions}>
          Add Practice Session
        </button>
      </div>
    </div>
  );
}

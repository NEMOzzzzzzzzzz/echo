import Link from 'next/link';
import PracticeSession from './components/PracticeSession';
import ProgressTracker from './components/ProgressTracker';

export default function Home() {
  return (
    <>
      <header className="header">
        <div className="container nav-container">
          <div className="logo">Echo</div>
          <nav className="nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/practice" className="nav-link">Practice</Link>
            <Link href="#contact" className="nav-link">Contact</Link>
          </nav>
        </div>
      </header>

      <section className="container hero">
        <div>
          <h1 className="hero-title">Your AI Soft Skills Mentor</h1>
          <p className="hero-subtitle">
            Practice interviews and public speaking with real-time AI feedback.
          </p>
          <Link href="/practice">
            <button className="btn btn-primary">Start Practicing</button>
          </Link>
        </div>
      </section>
      <section className="container assignment-components">
        <h2 className="section-title">Interactive Practice Tools</h2>
        <PracticeSession />
        <ProgressTracker />
      </section>

      <footer className="footer">
        <div className="footer-nav">
          <Link href="/" className="footer-link">Home</Link>
          <Link href="/practice" className="footer-link">Practice</Link>
          <a href="#contact" className="footer-link">Contact</a>
        </div>
        <p>© 2025 Echo. All rights reserved.</p>
      </footer>
    </>
  );
}

import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import '../styles/ResultScreen.css';

export default function ResultScreen() {
  const { state, dispatch } = useQuiz();

  // Save high score to localStorage
  useEffect(() => {
    const highScore = localStorage.getItem('quizHighScore') || 0;
    if (state.score > highScore) {
      localStorage.setItem('quizHighScore', state.score);
    }
  }, [state.score]);

  const getPerformanceMessage = () => {
    if (state.score >= 200) return "Outstanding! You're a quiz master! 🏆";
    if (state.score >= 150) return "Great job! You really know your stuff! 🌟";
    if (state.score >= 100) return "Good effort! Keep learning! 👍";
    return "Nice try! Practice makes perfect! 💪";
  };

  const handleRestart = () => {
    dispatch({ type: 'START_QUIZ', payload: { shuffledQuestions: state.questions } });
  };

  return (
    <div className="results-page">
      {/* Final Score Display */}
      <div className="score-card">
        <h1 className="completion-title">
          Quiz Complete!
        </h1>
        
        <div className="final-score">
          {state.score}
        </div>
        
        <p className="score-label">
          Final Score
        </p>

        <p className="performance-message">
          {getPerformanceMessage()}
        </p>
      </div>

      {/* Score Breakdown */}
      <div className="breakdown-card">
        <h2 className="breakdown-title">
          Score Breakdown
        </h2>
        <div className="breakdown-details">
          <div className="level-row">
            <span className="level-label">Easy Level:</span>
            <span className="level-points">{state.easyScore || 0} points</span>
          </div>
          <div className="level-row">
            <span className="level-label">Medium Level:</span>
            <span className="level-points">{state.mediumScore || 0} points</span>
          </div>
          <div className="level-row">
            <span className="level-label">Hard Level:</span>
            <span className="level-points">{state.hardScore || 0} points</span>
          </div>
        </div>
      </div>

      {/* High Score */}
      <div className="highscore-card">
        <h2 className="highscore-title">
          Personal Best
        </h2>
        <p className="highscore-value">
          {localStorage.getItem('quizHighScore') || 0}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          className="play-again-button"
          onClick={handleRestart}
        >
          Play Again
        </button>
        
        <button
          className="reset-button"
          onClick={() => window.location.reload()}
        >
          Reset Everything
        </button>
      </div>

      {/* Share Score */}
      <div className="share-section">
        <button
          className="share-button"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'My Quiz Score',
                text: `I scored ${state.score} points in the Quiz Game! Can you beat my score?`,
                url: window.location.href
              });
            }
          }}
        >
          Share Score
        </button>
      </div>
    </div>
  );
}
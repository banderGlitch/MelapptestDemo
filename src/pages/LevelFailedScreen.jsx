import { useQuiz } from '../context/QuizContext';
import '../styles/LevelFailed.css';

export default function LevelFailedScreen() {
  const { state, dispatch } = useQuiz();

  const handleRetryLevel = () => {
    dispatch({ type: 'RETRY_LEVEL' });
  };

  const handleRestartQuiz = () => {
    dispatch({ 
      type: 'START_QUIZ',
      payload: { shuffledQuestions: state.questions }
    });
  };

  return (
    <div className="level-failed-container">
      <div className="level-failed-card">
        {/* Level Failed Title */}
        <h2 className="level-failed-title">
          Level Failed!
        </h2>

        {/* Failed Level Message */}
        <p className="level-failed-message">
          You failed at the {state.currentLevel} level.
        </p>

        {/* Score Information */}
        <div className="score-info">
          <p className="score-text">
            You got <span className="highlight">{state.correctAnswers}</span> out of 3 correct.
          </p>
          <p className="score-text">
            You need at least <span className="highlight">2</span> correct answers to advance.
          </p>
        </div>

        {/* Current Score */}
        <p className="current-score">
          Current Score: <span className="highlight">{state.score}</span>
        </p>

        {/* Action Buttons */}
        <div className="button-container">
          <button
            onClick={handleRetryLevel}
            className="action-button"
          >
            Retry {state.currentLevel.charAt(0).toUpperCase() + state.currentLevel.slice(1)} Level
          </button>

          <button
            onClick={handleRestartQuiz}
            className="action-button"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
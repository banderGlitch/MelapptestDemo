import { useQuiz } from '../context/QuizContext';
import questions from '../data/questions.json';
import { shuffleQuestions } from '../lib/shuffleQuestion';
import '../styles/StartScreen.css';

export default function StartScreen() {
  const { dispatch } = useQuiz();

  const handleStart = () => {
    // Shuffle questions here
    const shuffledQuestions = shuffleQuestions(questions); // Add shuffle logic
    dispatch({ type: 'START_QUIZ', payload: { shuffledQuestions } });
  };

  return (
    <div className="start-screen">
      <div className="welcome-card">
        <h1 className="welcome-title">
          Welcome to the Quiz Game
        </h1>

        <div className="info-section">
          <p className="info-text">
            Test your knowledge across three difficulty levels:
          </p>
          
          <div className="levels-info">
            <div className="level-item">
              <span className="level-name">Easy:</span>
              <span className="level-points">10 points per correct answer</span>
            </div>
            
            <div className="level-item">
              <span className="level-name">Medium:</span>
              <span className="level-points">20 points per correct answer</span>
            </div>
            
            <div className="level-item">
              <span className="level-name">Hard:</span>
              <span className="level-points">30 points per correct answer</span>
            </div>
          </div>

          <div className="rules-section">
            <h2 className="rules-title">Game Rules:</h2>
            <ul className="rules-list">
              <li>Answer 3 questions in each level</li>
              <li>Need 2 correct answers to advance</li>
              <li>No time limit - think carefully!</li>
            </ul>
          </div>
        </div>

        <button 
          className="start-button"
          onClick={handleStart}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
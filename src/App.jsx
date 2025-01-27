import { useQuiz } from './context/QuizContext';
import StartScreen from './pages/StartScreen';
import QuizScreen from './pages/QuizScreen';
import ResultScreen from './pages/ResultScreen';
import LevelFailedScreen from './pages/LevelFailedScreen';

function GameController() {
  const { state } = useQuiz();

  switch (state.gameState) {
    case 'start':
      return <StartScreen />;
    case 'playing':
      return <QuizScreen />;
    case 'levelFailed':
      return <LevelFailedScreen />;
    case 'end':
      return <ResultScreen />;
    default:
      return <StartScreen />;
  }
}

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Quiz Game</h1>
        </div>
      </header>

      <main className="main-content">
        {GameController()}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Quiz Game. Test your knowledge across multiple levels.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
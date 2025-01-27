import { useQuiz } from './context/QuizContext';
import StartScreen from './pages/StartScreen';
import QuizScreen from './pages/QuizScreen';
import ResultScreen from './pages/ResultScreen';
import LevelFailedScreen from './pages/LevelFailedScreen';
// GameController manages which screen to show based on game state
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
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Quiz Game
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {GameController()}
          </div>
        </main>

        {/* Footer - Always at bottom */}
        <footer className="bg-white border-t mt-auto py-4">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-gray-500 text-sm">
              © 2024 Quiz Game. Test your knowledge across multiple levels.
            </p>
          </div>
        </footer>
      </div>
  );
}

export default App;
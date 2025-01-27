import { QuizProvider } from './context/QuizContext';
import { useQuiz } from './context/QuizContext';
import StartScreen from './pages/StartScreen';
import QuizScreen from './pages/QuizScreen';
import ResultScreen from './pages/ResultScreen';

// GameController manages which screen to show based on game state
function GameController() {
  const { state } = useQuiz();

  switch (state.gameState) {
    case 'start':
      return <StartScreen />;
    case 'playing':
      return <QuizScreen />;
    case 'end':
      return <ResultScreen />;
    default:
      return <StartScreen />;
  }
}

function App() {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Quiz Game
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <GameController />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-center text-gray-500 text-sm">
              © 2024 Quiz Game. Test your knowledge across multiple levels.
            </p>
          </div>
        </footer>
      </div>
    </QuizProvider>
  );
}

export default App;
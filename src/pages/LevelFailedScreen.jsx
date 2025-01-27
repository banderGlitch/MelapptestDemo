import { useQuiz } from '../context/QuizContext';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Level Failed Title */}
        <h2 className="text-4xl font-bold text-red-600 mb-4">
          Level Failed!
        </h2>

        {/* Failed Level Message */}
        <p className="text-xl text-gray-700 mb-6">
          You failed at the {state.currentLevel} level.
        </p>

        {/* Score Information */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-gray-700 text-lg mb-2">
            You got <span className="font-bold text-blue-600">{state.correctAnswers}</span> out of 3 correct.
          </p>
          <p className="text-gray-700 text-lg">
            You need at least <span className="font-bold text-blue-600">2</span> correct answers to advance.
          </p>
        </div>

        {/* Current Score */}
        <p className="text-xl text-gray-700 mb-8">
          Current Score: <span className="text-blue-600 font-bold">{state.score}</span>
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRetryLevel}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry {state.currentLevel.charAt(0).toUpperCase() + state.currentLevel.slice(1)} Level
          </button>

          <button
            onClick={handleRestartQuiz}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
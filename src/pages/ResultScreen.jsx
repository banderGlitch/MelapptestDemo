import { useQuiz } from '../context/QuizContext';
import Button from '../components/ui/Button';

export default function ResultScreen() {
  const { state, dispatch } = useQuiz();

  const getFinalMessage = () => {
    if (state.gameCompleted) {
      return "🎉 Congratulations! You've completed all levels!";
    }
    return `You reached the ${state.failedLevel} level. Keep practicing!`;
  };

  return (
    <div className="text-center space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        {getFinalMessage()}
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Final Score: {state.score}
        </h2>

        {/* Level Breakdown */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Easy Level:</span>
            <span className="font-semibold">{state.levelScores.easy} points</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Medium Level:</span>
            <span className="font-semibold">{state.levelScores.medium} points</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Hard Level:</span>
            <span className="font-semibold">{state.levelScores.hard} points</span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => dispatch({ 
          type: 'START_QUIZ', 
          payload: { shuffledQuestions: state.questions }
        })}
        className="w-full"
      >
        Play Again
      </Button>
    </div>
  );
}
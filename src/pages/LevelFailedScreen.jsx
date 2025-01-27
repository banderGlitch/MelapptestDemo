import { useQuiz } from '../context/QuizContext';
import Button from '../components/ui/Button';

export default function LevelFailedScreen() {
  const { state, dispatch } = useQuiz();

  return (
    <div className="text-center space-y-8">
      <div className="bg-red-50 border border-red-100 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Level Failed!
        </h2>
        <p className="text-gray-700 mb-4">
          You got {state.correctAnswers} out of {QUESTIONS_PER_LEVEL} correct answers.
          You need at least {REQUIRED_TO_PASS} correct answers to advance.
        </p>
        <p className="text-gray-600">
          Current Level: {state.currentLevel.charAt(0).toUpperCase() + state.currentLevel.slice(1)}
        </p>
      </div>

      <div className="space-y-4">
        <Button
          variant="primary"
          onClick={() => dispatch({ type: 'RETRY_LEVEL' })}
          className="w-full"
        >
          Retry Level
        </Button>
        
        <Button
          variant="secondary"
          onClick={() => dispatch({ type: 'START_QUIZ', payload: { shuffledQuestions: state.questions } })}
          className="w-full"
        >
          Restart Quiz
        </Button>
      </div>
    </div>
  );
}
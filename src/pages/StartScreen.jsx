import { useQuiz } from '../context/QuizContext';
import Button from '../components/ui/Button';
import questions from '../data/questions.json';

export default function StartScreen() {
  const { dispatch } = useQuiz();

  const handleStart = () => {
    // Shuffle questions here
    const shuffledQuestions = {...questions}; // Add shuffle logic
    dispatch({ type: 'START_QUIZ', payload: { shuffledQuestions } });
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to the Quiz Game
      </h1>
      <div className="space-y-4 mb-8">
        <p className="text-lg text-gray-600">
          Test your knowledge across three difficulty levels:
        </p>
        <ul className="text-gray-600">
          <li>Easy: 10 points per correct answer</li>
          <li>Medium: 20 points per correct answer</li>
          <li>Hard: 30 points per correct answer</li>
        </ul>
      </div>
      <Button onClick={handleStart}>
        Start Quiz
      </Button>
    </div>
  );
}
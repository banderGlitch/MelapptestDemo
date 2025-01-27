import { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import QuestionCard from '../components/quiz/QuestionCard';
import Button from '../components/ui/Button';
import { QUESTIONS_PER_LEVEL, REQUIRED_TO_PASS } from '../context/QuizContext';

export default function QuizScreen() {
  const { state, dispatch } = useQuiz();
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const currentQuestion = state.questions[state.currentLevel][state.currentQuestionIndex];

  const handleSubmitAnswer = () => {
    const isCorrect = userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    
    // Show feedback
    setShowFeedback(true);
    setFeedbackMessage(isCorrect ? 'Correct! 🎉' : 'Incorrect! 😕');

    // Update score and progress
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: { isCorrect }
    });

    // Wait for feedback, then proceed
    setTimeout(() => {
      setShowFeedback(false);
      setUserAnswer('');
      dispatch({ type: 'CHECK_LEVEL_COMPLETION' });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Level and Score Info */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Level: {state.currentLevel.charAt(0).toUpperCase() + state.currentLevel.slice(1)}
          </h2>
          <p className="text-gray-600">
            Question {state.currentQuestionIndex + 1} of {QUESTIONS_PER_LEVEL}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-blue-600">Score: {state.score}</p>
          <p className="text-sm text-gray-500">
            Correct: {state.correctAnswers}/{state.currentQuestionIndex + 1}
          </p>
        </div>
      </div>

      {/* Question Card */}
      <QuestionCard
        question={currentQuestion}
        onAnswer={setUserAnswer}
        userAnswer={userAnswer}
      />

      {/* Feedback Message */}
      {showFeedback && (
        <div className={`text-center p-3 rounded-lg ${
          feedbackMessage.includes('Correct') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {feedbackMessage}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmitAnswer}
          disabled={!userAnswer || showFeedback}
        >
          Submit Answer
        </Button>
      </div>
    </div>
  );
}
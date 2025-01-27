import { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import QuestionCard from '../components/quiz/QuestionCard';
import '../styles/QuizScreen.css';

export default function QuizScreen() {
    const { state, dispatch } = useQuiz();
    const [userAnswer, setUserAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
  
    const currentQuestion = state.questions[state.currentLevel][state.currentQuestionIndex];
    const questionKey = `${state.currentLevel}-${state.currentQuestionIndex}`;
    
    // Check if reviewing a previous question
    const isReviewingPrevious = state.currentQuestionIndex <= state.maxIndexReached[state.currentLevel];
  
    useEffect(() => {
      // Load previous answer if it exists
      const previousAnswer = state.answeredQuestions[questionKey]?.answer || '';
      setUserAnswer(previousAnswer);
      setShowFeedback(false);
    }, [state.currentQuestionIndex, state.currentLevel, questionKey]);
  
    const handleSubmitAnswer = () => {
      const isCorrect = userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
      
      setShowFeedback(true);
      setFeedbackMessage(isCorrect ? 'Correct! 🎉' : 'Incorrect! 😕');
  
      dispatch({
        type: 'ANSWER_QUESTION',
        payload: { 
          isCorrect,
          questionKey,
          answer: userAnswer
        }
      });
  
      setTimeout(() => {
        setShowFeedback(false);
        dispatch({ type: 'CHECK_LEVEL_COMPLETION' });
      }, 1500);
    };
  
    // Add this to show if user is reviewing a previous question


  return (
    <div className="quiz-container">
      {/* Level and Score Info */}
      <div className="quiz-header">
        <div className="level-info">
          <h2 className="level-title">
            Level: {state.currentLevel.charAt(0).toUpperCase() + state.currentLevel.slice(1)}
          </h2>
          <p className="question-progress">
            Question {state.currentQuestionIndex + 1} of 3
          </p>
        </div>
        <div className="score-info">
          <p className="current-score">Score: {state.score}</p>
          <p className="correct-answers">
            Correct: {state.correctAnswers}/{state.currentQuestionIndex + 1}
          </p>
        </div>
      </div>

      {/* Question Card Component */}
      <QuestionCard
        question={currentQuestion}
        onAnswer={setUserAnswer}
        userAnswer={userAnswer}
        showFeedback={showFeedback}
      />

{showFeedback && (
        <div className={`feedback-message ${feedbackMessage.includes('Correct') ? 'correct' : 'incorrect'}`}>
          {feedbackMessage}
        </div>
      )}

      {/* Button Container */}
      <div className="button-container">
        <button
          className="nav-button"
          onClick={() => dispatch({ type: 'PREVIOUS_QUESTION' })}
          disabled={state.currentQuestionIndex === 0 || showFeedback}
        >
          ← Previous
        </button>

        <button
          className="submit-button"
          onClick={handleSubmitAnswer}
          disabled={!userAnswer || showFeedback}
        >
          {showFeedback ? 'Submitted' : 'Submit Answer'}
        </button>
      </div>

    </div>
  );
}

// import { useState } from 'react';
// import { useQuiz } from '../context/QuizContext';
// import QuestionCard from '../components/quiz/QuestionCard';
// import Button from '../components/ui/Button';
// import { QUESTIONS_PER_LEVEL, REQUIRED_TO_PASS } from '../context/QuizContext';

// export default function QuizScreen() {
//   const { state, dispatch } = useQuiz();
//   const [userAnswer, setUserAnswer] = useState('');
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [feedbackMessage, setFeedbackMessage] = useState('');

//   const currentQuestion = state.questions[state.currentLevel][state.currentQuestionIndex];

//   const handleSubmitAnswer = () => {
//     const isCorrect = userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    
//     // Show feedback
//     setShowFeedback(true);
//     setFeedbackMessage(isCorrect ? 'Correct! 🎉' : 'Incorrect! 😕');

//     // Update score and progress
//     dispatch({
//       type: 'ANSWER_QUESTION',
//       payload: { isCorrect }
//     });

//     // Wait for feedback, then proceed
//     setTimeout(() => {
//       setShowFeedback(false);
//       setUserAnswer('');
//       dispatch({ type: 'CHECK_LEVEL_COMPLETION' });
//     }, 1500);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Level and Score Info */}
//       <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">
//             Level: {state.currentLevel.charAt(0).toUpperCase() + state.currentLevel.slice(1)}
//           </h2>
//           <p className="text-gray-600">
//             Question {state.currentQuestionIndex + 1} of {QUESTIONS_PER_LEVEL}
//           </p>
//         </div>
//         <div className="text-right">
//           <p className="text-lg font-semibold text-blue-600">Score: {state.score}</p>
//           <p className="text-sm text-gray-500">
//             Correct: {state.correctAnswers}/{state.currentQuestionIndex + 1}
//           </p>
//         </div>
//       </div>

//       {/* Question Card */}
//       <QuestionCard
//         question={currentQuestion}
//         onAnswer={setUserAnswer}
//         userAnswer={userAnswer}
//       />

//       {/* Feedback Message */}
//       {showFeedback && (
//         <div className={`text-center p-3 rounded-lg ${
//           feedbackMessage.includes('Correct') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//         }`}>
//           {feedbackMessage}
//         </div>
//       )}

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <Button
//           onClick={handleSubmitAnswer}
//           disabled={!userAnswer || showFeedback}
//         >
//           Submit Answer
//         </Button>
//       </div>
//     </div>
//   );
// }
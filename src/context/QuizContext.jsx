import { createContext, useContext, useReducer } from 'react';
import questions from '../data/questions.json';

const QuizContext = createContext();

const QUESTIONS_PER_LEVEL = 3;
const REQUIRED_TO_PASS = 2; // Need 2 out of 3 correct to advance

const initialState = {
    gameState: 'start',
    currentLevel: 'easy',
    currentQuestionIndex: 0,
    score: 0,
    levelScores: {
        easy: 0,
        medium: 0,
        hard: 0
    },
    correctAnswers: 0,
    questions: questions,
    failedLevel: null,
    answeredQuestions: {},
    maxIndexReached: {
        easy: -1,
        medium: -1,
        hard: -1
    }
};

function quizReducer(state, action) {
    switch (action.type) {
        case 'START_QUIZ':
            return {
                ...initialState,
                gameState: 'playing',
                questions: action.payload.shuffledQuestions
            };

            case 'ANSWER_QUESTION': {
                const { isCorrect, questionKey, answer } = action.payload;
                const [level, indexStr] = questionKey.split('-');
                const currentIndex = parseInt(indexStr);
                
                // Determine if this is a new attempt (not going backwards)
                const isNewAttempt = currentIndex > state.maxIndexReached[level];
                
                const points = {
                  easy: 10,
                  medium: 20,
                  hard: 30
                }[level];
          
                // Only update score and correctAnswers for new attempts
                if (isNewAttempt) {
                  return {
                    ...state,
                    score: isCorrect ? state.score + points : state.score,
                    levelScores: {
                      ...state.levelScores,
                      [level]: isCorrect 
                        ? state.levelScores[level] + points 
                        : state.levelScores[level]
                    },
                    correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
                    answeredQuestions: {
                      ...state.answeredQuestions,
                      [questionKey]: { answer, isCorrect }
                    },
                    maxIndexReached: {
                      ...state.maxIndexReached,
                      [level]: Math.max(state.maxIndexReached[level], currentIndex)
                    }
                  };
                }
          
                // Just update the answer without changing score for previous questions
                return {
                  ...state,
                  answeredQuestions: {
                    ...state.answeredQuestions,
                    [questionKey]: { answer, isCorrect }
                  }
                };
              }
          
        case 'CHECK_LEVEL_COMPLETION': {
            // Check if we've completed all questions for this level
            if (state.currentQuestionIndex + 1 >= QUESTIONS_PER_LEVEL) {
                // Check if passed the level
                if (state.correctAnswers >= REQUIRED_TO_PASS) {
                    // If completed hard level, end game with success
                    if (state.currentLevel === 'hard') {
                        return {
                            ...state,
                            gameState: 'end',
                            gameCompleted: true
                        };
                    }
                    // Progress to next level
                    return {
                        ...state,
                        currentLevel: state.currentLevel === 'easy' ? 'medium' : 'hard',
                        currentQuestionIndex: 0,
                        correctAnswers: 0
                    };
                } else {
                    // Failed the level
                    return {
                        ...state,
                        gameState: 'levelFailed',
                        failedLevel: state.currentLevel
                    };
                }
            }

            // Continue to next question
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1
            };
        }

        case 'RETRY_LEVEL':
            return {
                ...state,
                gameState: 'playing',
                currentQuestionIndex: 0,
                correctAnswers: 0,
                levelScores: {
                    ...state.levelScores,
                    [state.currentLevel]: 0
                }
            };
        case 'PREVIOUS_QUESTION':
            return {
                ...state,
                currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
            };

        case 'NEXT_QUESTION':
            return {
                ...state,
                currentQuestionIndex: Math.min(2, state.currentQuestionIndex + 1)
            };

        default:
            return state;
    }
}

export function QuizProvider({ children }) {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const value = {
        state,
        dispatch
    };

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
}

// Custom Hook
export function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
}

// Make sure to export everything needed
export { QuizContext, QUESTIONS_PER_LEVEL, REQUIRED_TO_PASS };  // if needed elsewhere

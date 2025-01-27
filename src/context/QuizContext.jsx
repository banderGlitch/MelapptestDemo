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
    failedLevel: null
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
            const isCorrect = action.payload.isCorrect;
            const points = {
                easy: 10,
                medium: 20,
                hard: 30
            }[state.currentLevel];

            const newScore = isCorrect ? state.score + points : state.score;
            const newLevelScores = {
                ...state.levelScores,
                [state.currentLevel]: state.levelScores[state.currentLevel] + (isCorrect ? points : 0)
            };

            return {
                ...state,
                score: newScore,
                levelScores: newLevelScores,
                correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers
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
export { QuizContext ,  QUESTIONS_PER_LEVEL, REQUIRED_TO_PASS};  // if needed elsewhere

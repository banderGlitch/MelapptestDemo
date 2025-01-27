import '../../styles/QuestionCard.css';

const QuestionCard = ({ question, onAnswer, userAnswer, showFeedback }) => {
  const renderAnswerOptions = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="options-grid">
            {question.options.map((option) => (
              <label
                key={option}
                className="option-label"
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => onAnswer(e.target.value)}
                  className="radio-input"
                />
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="true-false-container">
            {['true', 'false'].map((option) => (
              <label
                key={option}
                className="true-false-label"
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => onAnswer(e.target.value)}
                  className="radio-input"
                />
                <span className="option-text capitalize">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'text-input':
        return (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => onAnswer(e.target.value)}
            className="text-input"
            placeholder="Type your answer..."
          />
        );
    }
  };

  return (
    <div className="question-card">
      <div className="question-content">
        <h3 className="question-text">
          {question.question}
        </h3>
        <div className="answer-section">
          {renderAnswerOptions()}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

const QuestionCard = ({ question, onAnswer, userAnswer, showFeedback }) => {
  const renderAnswerOptions = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option}
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => onAnswer(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="flex space-x-4">
            {['true', 'false'].map((option) => (
              <label
                key={option}
                className="flex-1 flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => onAnswer(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-2 capitalize">{option}</span>
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
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type your answer..."
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {question.question}
        </h3>
        <div className="mt-4">{renderAnswerOptions()}</div>
      </div>
    </div>
  );
};

export default QuestionCard;
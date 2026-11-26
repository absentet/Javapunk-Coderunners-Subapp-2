//Function that shows the questions and lets the user pick 
//One answer to submit
//The correct answer gets colored green, and if a wrong  
//answer is submitted it gets colored red

function QuestionCard({
    question,
    selectedAnswerId,
    onAnswerChange,
    isAnswered,
    isChecking,
    correctAnswerId,
}) {
    return (
        <div className="quiz-answers">
            {question.answers.map((answer) => {
                let backgroundColor;

                if (isAnswered && answer.id === correctAnswerId) {
                    backgroundColor = "green";
                } else if (isAnswered && answer.id === selectedAnswerId ) {
                    backgroundColor = "red";
                }

                return (
                    <div key={answer.id}>
                        <label
                            className="quiz-answer"
                            style={{backgroundColor}}
                        >
                            <input 
                                type="radio"
                                name={`answer-${question.id}`}
                                value={answer.id}
                                checked={selectedAnswerId === answer.id}
                                onChange={() => onAnswerChange(answer.id)}
                                disabled={isAnswered || isChecking}
                                required
                            />
                            {" "}
                            <span>{answer.text}</span>
                        </label>
                    </div>
                );
            })}
        </div>
    );
}

export default QuestionCard;
import { useEffect, useState } from "react";
import { GetQuestions } from "../api/qnacrudapi";
import { useNavigate } from "react-router-dom";

function ListEditQuestionsPage() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        GetQuestions()
            .then(setQuestions)
            .catch((requestError) => setError(requestError.message))
            .finally(() => setLoading(false));
    }, []);

    function handleEditQuestionClick(questionId) {
        navigate("" + questionId);
    }

  return (
      <section className="question-list">
          <h2>Questions</h2>
          {loading && <p>Loading questions...</p>}
          {error && <p role="alert">{error}</p>}
          {!loading && !error && questions.length === 0 && <p>No questions found.</p>}
          {!loading && !error && questions.length > 0 && (
              <ul>
                  {questions.map((question, questionIndex) => (
                      <li key={`${question.moduleId}-${questionIndex}`}>
                          <p>{question.questionText}</p>
                          <ul>
                              {question.answers.map((answer, answerIndex) => (

                                  <li key={answerIndex}>
                                      {answer.answerText}{answer.isCorrect ? " (Correct)" : ""}
                                  </li>
                              ))}
                          </ul>
                          <button onClick={() => handleEditQuestionClick(question.questionId)}>Edit</button>
                      </li>
                  ))}
              </ul>
          )}
      </section>
  );
}

export default ListEditQuestionsPage;
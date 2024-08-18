import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const handleCorrectAnswerChange = (event) => {
    const correctIndex = parseInt(event.target.value, 10);
    onUpdate(question.id, correctIndex);
  };

  return (
    <li>
      <p>{question.prompt}</p>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <label>
        Correct Answer:
        <select
          value={question.correctIndex}
          onChange={handleCorrectAnswerChange}
        >
          {question.answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onDelete(question.id)}>Delete</button>
    </li>
  );
}

export default QuestionItem;

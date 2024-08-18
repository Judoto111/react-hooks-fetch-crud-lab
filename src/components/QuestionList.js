import React, { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);

  // Fetch questions from the server
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  // Handle adding a new question
  const handleAddQuestion = (newQuestion) => {
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  // Handle deleting a question
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id)))
      .catch(error => console.error('Error deleting question:', error));
  };

  // Handle updating a question
  const handleUpdate = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(response => response.json())
      .then(updatedQuestion => {
        setQuestions(prevQuestions => prevQuestions.map(question =>
          question.id === id ? updatedQuestion : question
        ));
      })
      .catch(error => console.error('Error updating question:', error));
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <button onClick={() => setFormVisible(!isFormVisible)}>
        {isFormVisible ? "Hide Form" : "New Question"}
      </button>
      {isFormVisible && <QuestionForm onAddQuestion={handleAddQuestion} />}
      <ul>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

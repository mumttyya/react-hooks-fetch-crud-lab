import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          onDelete(id);
        return res.json();
        }
        throw new Error("Failed to delete question");
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  function handleCorrectAnswerChange(e) {
    const newCorrectIndex = parseInt(e.target.value);
    const updatedQuestion = {
      ...question,
      correctIndex: newCorrectIndex
    };

    // Optimistically update the UI
    onUpdate(updatedQuestion);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update question");
        }
        return res.json();
      })
      .then((serverUpdatedQuestion) => {
        // Ensure UI matches server state
        onUpdate(serverUpdatedQuestion);
      })
      .catch((error) => {
        console.error("Error updating question:", error);
        // Revert if there was an error
        onUpdate(question);
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <p>{prompt}</p>
      <label>
        Correct Answer:
        <select 
          value={correctIndex} 
          onChange={handleCorrectAnswerChange}
          data-testid="correct-answer-dropdown"
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
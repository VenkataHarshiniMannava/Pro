import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [goalText, setGoalText] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [goals, setGoals] = useState([]);

  // Load stored goals from local storage on initial load
  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
    setGoals(storedGoals);
  }, []);

  // Update local storage when goals change
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setGoalText(inputText);
    setIsButtonDisabled(inputText.length === 0);
  };

  const handleAddGoal = () => {
    if (!isButtonDisabled) {
      const newGoal = { id: Date.now(), text: goalText };
      setGoals([...goals, newGoal]);
      setGoalText('');
      setIsButtonDisabled(true);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={goalText}
        placeholder="Enter your goal"
        onChange={handleInputChange}
      />
      <button
        id="addGoalBtn"
        onClick={handleAddGoal}
        disabled={isButtonDisabled}
      >
        Add Goal
      </button>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>{goal.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

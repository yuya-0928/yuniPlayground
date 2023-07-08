import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTasks([...tasks, event.currentTarget.value]);
  };

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTask(event.currentTarget.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          タスク：
          <input type="text" name="task" onChange={handleOnChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default App;

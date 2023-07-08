import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTasks([...tasks, event.currentTarget.value]);
  };

  const handleOnChange = () => {};

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          タスク：
          <input type="text" name="task" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
  };

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTask(event.currentTarget.value);
  };

  const refreshTaskList = () => {
    localStorage.removeItem("tasks");
  };

  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      setTasks(JSON.parse(tasks) as string[]);
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          タスク：
          <input type="text" name="task" onChange={handleOnChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={() => refreshTaskList()}>タスク全削除</button>
    </>
  );
}

export default App;

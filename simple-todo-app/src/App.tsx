import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";

type Task = {
  content: string;
};

const TaskList = (tasks: Task) => {
  return (
    <>
      <p>{tasks.content}</p>
    </>
  );
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    localStorage.setItem(
      "tasks",
      JSON.stringify([...tasks, { content: task }])
    );
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
      setTasks(JSON.parse(tasks) as Task[]);
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
      <h1>タスク一覧</h1>
      <p>タスクの数：{tasks.length}</p>
      {tasks.map((element) => {
        return TaskList(element);
      })}
    </>
  );
}

export default App;

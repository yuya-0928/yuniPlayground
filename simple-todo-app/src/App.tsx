import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";

type Task = {
  id: number;
  content: string;
  done: boolean;
};

const TaskList = (tasks: Task) => {
  return (
    <>
      <div>
        <input type="checkbox" id={tasks.id.toString()} onChange={() => } />
        id:{tasks.id} {tasks.content}
      </div>
    </>
  );
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const store_tasks = localStorage.getItem("tasks");
    let task_id: number;
    if (store_tasks) {
      task_id = tasks.length + 1;
    } else {
      task_id = 1;
    }

    localStorage.setItem(
      "tasks",
      JSON.stringify([...tasks, { id: task_id, content: task, done: false }])
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
      <form onSubmit={refreshTaskList}>
        <input type="submit" value="タスク全削除" />
      </form>
      <h1>タスク一覧</h1>
      <p>タスクの数：{tasks.length}</p>
      {tasks.map((element) => {
        return TaskList(element);
      })}
    </>
  );
}

export default App;

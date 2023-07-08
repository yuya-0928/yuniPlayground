import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);

  const handleSubmit = () => {};
  return (
    <>
      <form>
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

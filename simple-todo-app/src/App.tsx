import "./App.css";

function App() {
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

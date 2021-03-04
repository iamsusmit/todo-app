import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo";
import { db } from "./firebase";
import firebase from "firebase";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,//field name in firebase is todo
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <h1>Todo app</h1>

      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add todo
        </Button>
      </form>

      {todos.map((todo, i) => (
        <Todo text={todo} key={i} />
      ))}
    </div>
  );
}

export default App;

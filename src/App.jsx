import REACT, { useEffect, useState } from "react";
import { InputTodo } from "./componaint/InputTodo";
import { IncompleteTodo } from "./componaint/IncompleteTodo";
import { CompleteTodo } from "./componaint/CompleteTodo";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteToDos, setincompleteToDos] = useState([]);
  const [completeToDos, setcompleteToDos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = (event) => {
    if (todoText === "") return;

    const newTodos = [...incompleteToDos, todoText];
    setincompleteToDos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteToDos];
    newTodos.splice(index, 1);
    setincompleteToDos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteToDos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeToDos, incompleteToDos[index]];

    setincompleteToDos(newIncompleteTodos);
    setcompleteToDos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeToDos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteToDos, completeToDos[index]];

    setincompleteToDos(newIncompleteTodos);
    setcompleteToDos(newCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteToDos.length >= 5}
      />
      {incompleteToDos.length >= 5 && (
        <p style={{ color: "red" }}>Todoできるのは５個まで！</p>
      )}

      <IncompleteTodo
        todos={incompleteToDos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodo todos={completeToDos} onClickBack={onClickBack} />
    </>
  );
};

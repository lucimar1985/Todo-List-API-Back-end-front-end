import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import {
  Container,
  ToDoList,
  Input,
  Button,
  ListItem,
  Trash,
  Check,
  H3,
} from "./styles.js";
import api from "./api";

function App() {
  const [list, setList] = useState([]);
  const [inputTask, setInputTask] = useState("");

  async function pegarTodasTarefas() {
    const { data } = await api.get("/todos");
    setList(data);
  }

  function inputMudou(event) {
    setInputTask(event.target.value);
  }

  async function cliqueiNoBotao() {
    if (inputTask) {
      await api.post("/todos", { task: inputTask });
      pegarTodasTarefas();
      setInputTask("");
    }
  }

  async function finalizarTarefa(id, finished) {
    await api.patch(`/todos/${id}`,{
      finished: !finished
    })
    pegarTodasTarefas();
  }

  async function deletarItem(id) {
    await api.delete(`/todos/${id}`)
    pegarTodasTarefas()
  }

  useEffect(() => {
    pegarTodasTarefas();
  }, []);

  return (
    <Container>
      <ToDoList>
        <Input
          onChange={inputMudou}
          placeholder="O que tenho que fazer..."
          value={inputTask}
        />
        <Button onClick={cliqueiNoBotao}>Adicionar</Button>

        <ul>
          {list.length > 0 ? (
            list.map((item) => (
              <ListItem isFinished={item.finished} key={item._id}>
                <Check onClick={() => finalizarTarefa(item._id, item.finished)} />
                <li>{item.task}</li>
                <Trash onClick={() => deletarItem(item._id)} />
              </ListItem>
            ))
          ) : (
            <H3>Não há itens na lista</H3>
          )}
        </ul>
      </ToDoList>
    </Container>
  );
}

export default App;

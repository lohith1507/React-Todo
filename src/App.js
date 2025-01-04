import { createContext, useState } from "react";
import "./App.css";
import Index from "./comp/index";

export const GlobalContext = createContext();

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/items");
    if (!res.ok) {
      throw new Error("Data not Fetched");
    }
    const data = await res.json();
    setTodos(data);
    // console.log(data);
  };

  const addTodo = async (newItem) => {
    try {
      const res = await fetch("http://localhost:5000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      return await res.json();
    } catch (err) {
      console.log("Error adding item:", err);
    }
  };

  const editTodo = async(id, updatedItem) => {
    try{
      const res = await fetch(`http://localhost:5000/items/${id}`,{
        method: 'PUT',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(updatedItem)
      })
      return await res.json()
    }
    catch(err){
      console.log("Error editing an Item " , err);
    }
  }

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <GlobalContext.Provider
      value={{ todos, setTodos, fetchTodos, deleteTodo, addTodo, editTodo }}
    >
      <Index />
    </GlobalContext.Provider>
  );
}

export default App;

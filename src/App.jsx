
import {DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useEffect, useState } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todo")) || [
  { id: 1, text:'Aprender React.js'},
  { id: 2, text:'Aprender JS'},
  { id: 3, text:'Aprender Vue.js'}
];

const App = () => { 
  const [todo, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  },[todo]);

  const handleDragEnd = result =>{
    
    if (!result.destination) return;
    const startIndex = result.source.index
    const endIndex = result.destination.index
    const copyArray = [...todo]
    const [reorderedItem] = copyArray.splice(startIndex, 1);
    copyArray.splice(endIndex, 0,reorderedItem)
    setTodos(copyArray)
  };
  
  return(
    <DragDropContext onDragEnd={handleDragEnd}>

      <h1>Todo</h1>
      <Droppable droppableId="todos">
          {
            (dropableProvider) => (
              <ul ref={dropableProvider.innerRef}{...dropableProvider.droppableProps}>
                {todo.map((todo, index) => (
                  <Draggable key={todo.id} index={index}  draggableId={`${todo.id}`}>
                    {
                      (draggableProvider) => (
                        <li 
                          ref={draggableProvider.innerRef} 
                          {...draggableProvider.dragHandleProps}
                          {...draggableProvider.draggableProps}
                        >
                          {todo.text}
                        </li>
                      )
                    }
                  </Draggable>
                ))}
                {dropableProvider.placeholder}
              </ul>
            )
          }
      </Droppable>
    </DragDropContext>
  )
 }

 export default App;
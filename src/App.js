import "./App.css";
import { useState, useRef, useEffect } from "react";
import ToDoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import { Box, TextField } from "@material-ui/core";
import { ConditionalComponent } from "./ConditionalComponent";
import { ImgMediaCard } from "./Card";
import { Album } from "./Album";


const App = () => {
  const [todos, setTodos] = useState([]);
  const [images, setImages] = useState([]);

  let [showImageInputs, setImageForm] = useState(false);
  const todoRef = useRef("hello");

  const imagePathRef = useRef("path");
  const imageTextRef = useRef("text");
  
  useEffect(() => {
    const storedImages = localStorage.getItem("LOCAL_STORAGE_IMAGE_DB")
    if (storedImages) {
      console.log("storedImages", JSON.parse(storedImages));
      const reversedArray = reverseArray(JSON.parse(storedImages));
      console.log("reversedArray", reversedArray);
      setImages(reversedArray);
    }
  }, []);

  useEffect(() => {
    const storedTodos = localStorage.getItem("LOCAL_STORAGE")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    setImageForm(false);
  }, [])

  useEffect(() => {
    localStorage.setItem("LOCAL_STORAGE", JSON.stringify(todos))
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("LOCAL_STORAGE_IMAGE_DB", JSON.stringify(images))
  }, [images]);
  
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find(x => x.id === id);
    todo.complete  = !todo.complete;
    setTodos(newTodos);
  }

  function addTodo(event){
    let task = todoRef.current.value;
    if (task === "") {
      return;
    }
    else {
      setTodos((prevTodos) => {
        return [...prevTodos, {id: uuidv4(), name: task, complete: false}]
      })
      todoRef.current.value = null;
    }
  }

  const addImage = (event) => {
    let imagePath = imagePathRef.current.value;
    let imageText = imageTextRef.current.value;
    if (imagePath === "" || imageText === "") {
      return;
    }
    else {
      setImages((storedImages) => {
        return [...storedImages, {id: uuidv4(), image_text: imageText, image_path: imagePath}]
      })
      imageTextRef.current.value = null;
      imagePathRef.current.value = null;
    }
  }

  const toggleImageForm = () => {
    showImageInputs = !showImageInputs;
    return setImageForm(showImageInputs);
  }

  const reverseArray = (arrayParam) => {
    const array = [...arrayParam];
    var reversedArray = [...array].reverse();
    console.log(reversedArray)
    return reversedArray;
  }

  const clearTodos = () => {
    const newTodos = [...todos]
    newTodos.forEach( x => {
      if (x.complete === true) {
        const index = newTodos.indexOf(x);
        newTodos.splice(index, 1);
      }
      return setTodos(newTodos)
    })
  }

  return (
    <>
    
    <Box m={3}>
      <ToDoList todos={todos} toggleTodo={toggleTodo}/>
      <br/>
      <Box my={5}>
        <TextField color="secondary" variant="outlined" className="mb-3" id="standard-basic" label="enter to-do " inputRef={todoRef} type="text"/><br/>
      </Box>
      <Box>
        <Button className="mx-1" variant="contained" color="primary" onClick={addTodo}>Add Todo</Button>
        <Button className="mx-1" variant="contained" onClick={clearTodos}>Clear done task</Button>
      </Box>
      <br/>
      <div>{todos.sort(todo => !todo.complete).length} left to do</div>
      <hr/>
    </Box>

    <Box m={3}>

      <Button variant="contained" color="primary" onClick={toggleImageForm}>make an image gallery!</Button>
      
      <ConditionalComponent boolean={showImageInputs}>
        <Box my={3}>
          <TextField fullWidth id="path" variant="outlined" color="secondary" inputRef={imagePathRef} type="text" label="Image Path"/>
        </Box>
        <Box my={3}>          
          <TextField fullWidth id="text" variant="outlined" color="secondary" inputRef={imageTextRef} type="text" label="Image Text"/>
        </Box>
        <Button type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={addImage}>
          submit
        </Button>
      </ConditionalComponent>
    <Album images={images}/>
    </Box> 
    </>
  );
};


export default App;

import React from 'react'
import Todo from './Todo';

export default function ToDoList({todos, toggleTodo}) {
    return (
            todos.map(x => {
                return <Todo key={x.id} singleTodo={x} toggleTodo={toggleTodo}/>
            })
    )
}

import React from 'react'

export default function Todo({singleTodo, toggleTodo}) {
    function handleTodoToggle(){
        toggleTodo(singleTodo.id)
    }
    return (
        <>
        <label>
            <input type="checkbox" checked={singleTodo.complete === true} onChange={handleTodoToggle}/>
            {singleTodo.name}
        </label><br/>
        </>
    )
}

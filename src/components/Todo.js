import React, {useState} from "react";

export const Todo = () => {
    const [todoList,setTodoList] = useState([]);

    const [toSave,setToSave] = useState({
        id: '',
        name: '',
        isDone: false
    })


    const generateId = () => {
        return (Date.now()
            .toString(36) + Math.random().toString(36).slice(2, 7)).toUpperCase();
    };

    const handleChange = (event) => {
        setToSave({
            id: generateId(),
            name: event.target.value,
            isDone: false
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setTodoList([...todoList,toSave])
        setToSave({
            id: '',
            name: '',
            isDone: false
        })
        console.log(toSave)
    }

    return (
        <>
            <div className="container">
                <div className="todo-container">
                    <h1>TODO</h1>
                    <form id="adding-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={toSave.name}
                            onChange={handleChange}/>
                        <button type="submit" id="submit-button">Add</button>
                    </form>
                    <div className="todo">
                        {todoList.filter((todo) => !todo.isDone).map((item, index)=>(
                            <div key={index}>
                                <span>{item.name}</span>
                                <input id="status-checkbox" type="checkbox" onChange={() => {
                                    const updatedList = todoList.map(todo => {
                                        if (todo.id === item.id) {
                                            todo.isDone = true;
                                        }
                                        return todo;
                                    });
                                    setTodoList(updatedList);
                                }}>
                                </input>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="done-container">
                    <h1>DONE</h1>
                    <div className="done">
                        {todoList.filter((todo) => todo.isDone).map((item, index)=>(
                            <div key={index}>
                                <div key={index}>
                                    <span>{item.name}</span>
                                    <input id="status-checkbox" type="checkbox" defaultChecked="true" onChange={() => {
                                        const updatedList = todoList.map(todo => {
                                            if (todo.id === item.id) {
                                                todo.isDone = false;
                                            }
                                            return todo;
                                        });
                                        setTodoList(updatedList);
                                    }}>
                                    </input>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
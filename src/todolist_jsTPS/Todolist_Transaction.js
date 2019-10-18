import {jsTPS_Transaction} from './jsTPS.js'

class Todolist_Transaction extends jsTPS_Transaction
{
    constructor(initToDoList, newToDoList)
    {
        super();
        this.oldToDoList = initToDoList;
        this.todoList = initToDoList;
        this.newToDoList = newToDoList;
    }

    setNewToDoList(newToDoList)
    {
        this.newToDoList = newToDoList;
    }

    doTransaction()
    {
        this.todoList = this.newToDoList;
        return this.todoList;
    }

    undoTransaction()
    {
        this.todoList = this.oldToDoList;
        return this.todoList;
    }
}

export default Todolist_Transaction
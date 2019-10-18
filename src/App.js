import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import ModalContainer from './components/list_screen/ModalContainer'
import {jsTPS} from './todolist_jsTPS/jsTPS'
import Todolist_Transaction from './todolist_jsTPS/Todolist_Transaction'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

const ItemSortCriteria = {
  SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
  SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
  SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
  SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
  SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
  SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItemSortCriteria: "",
    editItem: null,
    prevCurrentList: null,
    toDoListjsTPS: new jsTPS(),
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN}, () => {console.log("currentScreen: " + this.state.currentScreen)});
    this.setState({currentList: null}, () => {console.log("currentList: " + this.state.currentList)});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN}, () => {console.log("currentScreen: " + this.state.currentScreen)});
    this.setState({currentList: todoListToLoad}, () => {console.log("currentList: " + this.state.currentList)});
  }

  loadItem = (todoItemToLoad, pastCurrentList) =>
  {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN}, () => {console.log("currentScreen: " + this.state.currentScreen)});
    this.setState({editItem: todoItemToLoad}, () => {console.log("currentItem: " + this.state.editItem)});
    this.setState({prevCurrentList: pastCurrentList});
  }

  changeName = (event) =>
  {
    let currentList = this.state.currentList;
    currentList.name = event.target.value;
    this.setState({currentList});
  }

  changeOwner = (event) =>
  {
    let currentList = this.state.currentList;
    currentList.owner = event.target.value;
    this.setState({currentList});
  }

  removeList = (listToRemove) =>
  {
    let todoLists = this.state.todoLists;
    let indexOfList = todoLists.indexOf(listToRemove);
    if (indexOfList >= 0)
    {
      todoLists.splice(indexOfList, 1);
    }

    this.setState({todoLists});
    
  }

  prependList = (listToPrepend) =>
  {
    let todoLists = this.state.todoLists;
    todoLists.unshift(listToPrepend);
    this.setState({todoLists});
  }

  createNewListKey = () =>
  {
    if (this.state.todoLists.length === 0)
    {
      return 0;
    }

    let biggestKey = this.state.todoLists[0].key;

    for (var i = 0; i < this.state.todoLists.length; i++)
    {
      if (this.state.todoLists[i].key > biggestKey)
      {
        biggestKey = this.state.todoLists[i].key;
      }
    }

    return biggestKey + 1;
  }

  createNewListOnClick = () =>
  {
    let newToDoList = {}; // {} means new Object as a literal
    newToDoList.key = this.createNewListKey(); // CreateNewListKey finds biggest key currently and adds 1 to it.
    newToDoList.name = "Unnknown";
    newToDoList.owner = "Unknown";
    newToDoList.items = [];

    let currentList = this.state.currentList;
    currentList = newToDoList;
    this.setState({currentList}, () => {this.loadList(this.state.currentList)});

    this.prependList(newToDoList);
  }

  isCurrentItemSortCriteria = (testCriteria) =>
  {

    return this.state.currentItemSortCriteria === testCriteria;
  }

  sortTasks = (sortingCriteria) =>
  {
    let currentItemSortCriteria = this.state.currentItemSortCriteria;
    let currentList = this.state.currentList;

    currentItemSortCriteria = sortingCriteria;
    this.setState({currentItemSortCriteria}, () => {currentList.items.sort(this.compare)});

    this.setState({currentList}, () => {this.loadList(this.state.currentList)});
  }

  compare = (item1, item2) =>
  {
        // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)
                || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)) {
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        // SORT BY ITEM DESCRIPTION
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)) {
            if (item1.description < item2.description)
                return -1;
            else if (item1.description > item2.description)
                return 1;
            else
                return 0;
        }
        // SORT BY COMPLETED
        else {
            if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)
                || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)){
                if (item1.completed < item2.completed)
                    return -1;
                else if (item1.completed > item2.completed)
                    return 1;
                else
                    return 0;
                }
                // SORT BY DUE DATE
                else
                {
                    if (item1.due_date < item2.due_date)
                        return -1;
                    else if (item1.due_date > item2.due_date)
                        return 1;
                    else
                        return 0;
                }
        }
  }

  getPrevOrNextItemKey = (itemKey, prevOrNext) =>
  {
    let items = this.state.currentList.items;

    for (var i = 0; i < items.length; i++)
    {
      if (items[i].key === itemKey)
      {
        if ((i + prevOrNext) >= 0 && (i + prevOrNext) < items.length)
        {
          return items[i + prevOrNext].key;
        }
      }
    }
  }

  swapItems = (item1Key, item2Key) =>
  {
    if (this.state.currentList != null)
    {
      let currentList = this.state.currentList;
      let items = currentList.items;
      let item1 = items[0];
      let item2 = items[1];
      for (var i = 0; i < items.length; i++)
      {
        if (items[i].key === item1Key)
        {
          item1 = items[i];
        }

        if (items[i].key === item2Key)
        {
          item2 = items[i];
        }
      }

      let item1Index = items.indexOf(item1);
      let item2Index = items.indexOf(item2);

      items[item1Index] = items[item2Index];
      items[item2Index] = item1;

      this.setState({currentList});
    }
  }

  deleteItem = (event, deleteItemKey) =>
  {
    let currentList = this.state.currentList;
    let items = currentList.items;
    let deleteItem = items[0];

    for (var i = 0; i < items.length; i++)
    {
      if (items[i].key === deleteItemKey)
      {
        deleteItem = items[i];
        break;
      }
    }

    let deleteItemIndex = items.indexOf(deleteItem);

    // CREATING TRANSACTION FOR THE DELETE
    let transaction = new Todolist_Transaction(this.makeOldList(), []);

    items.splice(deleteItemIndex, 1);

    this.setState({currentList}, transaction.setNewToDoList(this.state.currentList));

    this.state.toDoListjsTPS.addTransaction(transaction);
    event.stopPropagation();
  }

  createNewItemKey = () =>
  {
    if (this.state.currentList.items.length === 0)
    {
      return 0;
    }

    let biggestKey = this.state.currentList.items[0].key;

    for (var i = 0; i < this.state.currentList.items.length; i++)
    {
      if (this.state.currentList.items[i].key > biggestKey)
      {
        biggestKey = this.state.currentList.items[i].key;
      }
    }

    return biggestKey + 1;
  }

  createNewItemOnClick = () =>
  {
    let newToDoItem = {};
    newToDoItem.key = this.createNewItemKey(); // CreateNewItemKey finds biggest item key currently in the list and adds 1 to it.
    newToDoItem.description = "Unknown";
    newToDoItem.assigned_to = "Unknown";
    newToDoItem.completed = false;
    newToDoItem.due_date = "Unknown";

    let editItem = this.state.editItem;
    let oldCurrentList = this.state.currentList;
    editItem = newToDoItem;

    this.setState({editItem}, () => {this.loadItem(this.state.editItem, oldCurrentList)});
  }

  changeDescription = (event) =>
  {
    let editItem = this.state.editItem;
    editItem.description = event.target.value;
    this.setState({editItem});
  }

  changeAssignedTo = (event) =>
  {
    let editItem = this.state.editItem;
    editItem.assigned_to = event.target.value;
    this.setState({editItem});
  }

  changeDueDate = (event) =>
  {
    let editItem = this.state.editItem;
    editItem.due_date = event.target.value;
    this.setState({editItem});
  }

  changeCompleted = (event) =>
  {
    let editItem = this.state.editItem;
    editItem.completed = event.target.checked;
    this.setState({editItem});
  }

  makeOldList()
  {
    let oldCurrentList = {};
    oldCurrentList.key = this.state.currentList.key;
    oldCurrentList.name = this.state.currentList.name;
    oldCurrentList.owner = this.state.currentList.owner;
    oldCurrentList.items = [];
    
    for (var j = 0; j < this.state.currentList.items.length; j++)
    {
      let item = {};
      item.key = this.state.currentList.items[j].key;
      item.assigned_to = this.state.currentList.items[j].assigned_to;
      item.completed = this.state.currentList.items[j].completed;
      item.description = this.state.currentList.items[j].description;
      item.due_date = this.state.currentList.items[j].due_date;
      oldCurrentList.items.push(item);
    }

    return oldCurrentList;
  }

  editItem = (itemKey) =>
  {
    let itemToEdit = this.state.currentList.items[0];
    let editItem = this.state.editItem;

    for (var i = 0; i < this.state.currentList.items.length; i++)
    {
      if (this.state.currentList.items[i].key === itemKey)
      {
        itemToEdit = this.state.currentList.items[i];
        break;
      }
    }

    if (itemToEdit)
    {
      editItem = itemToEdit;

      this.setState({editItem}, () => {this.loadItem(this.state.editItem, this.makeOldList())});
    }
  }

  confirmItemChanges = () =>
  {
    let currentList = this.state.currentList;
    let editItem = this.state.editItem;

    if (editItem != null)
    {
      if (!currentList.items.includes(editItem))
      {
        currentList.items.push(editItem);
        this.setState({currentList}, () => {this.loadList(currentList)});
      }
      else
      {
        this.loadList(currentList);
      }
    }
  }

  cancelItemChanges = () =>
  {
    let prevCurrentList = this.state.prevCurrentList;

    this.loadList(prevCurrentList);
  }

  getItemIndex = (Item) =>
  {
    return this.state.currentList.items.indexOf(Item);
  }

  setCurrentList = (currentList) =>
  {
    if (currentList)
    {
      this.setState({currentList});
    }

  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList} 
        todoLists={this.state.todoLists}
        removeList={this.removeList} 
        prependList={this.prependList}
        createNewListOnClick = {this.createNewListOnClick} />;
      case AppScreen.LIST_SCREEN:            
        return (
            <React.Fragment>
              <ListScreen
                goHome={this.goHome.bind(this)}
                todoList={this.state.currentList}
                changeName={this.changeName}
                changeOwner={this.changeOwner}
                isCurrentItemSortCriteria={this.isCurrentItemSortCriteria}
                sortTasks={this.sortTasks}
                ItemSortCriteria={ItemSortCriteria} 
                swapItems={this.swapItems}
                getPrevOrNextItemKey={this.getPrevOrNextItemKey}
                deleteItem={this.deleteItem}
                createNewItemOnClick={this.createNewItemOnClick}
                editItem={this.editItem}
                getItemIndex={this.getItemIndex}
                toDoListjsTPS={this.state.toDoListjsTPS}
                setCurrentList={this.setCurrentList} />

              <ModalContainer
              todoList={this.state.currentList}
              removeList={this.removeList} 
              goHome={this.goHome.bind(this)} />
            </React.Fragment>
            );
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen
                  todoItem={this.state.editItem}
                  changeDescription={this.changeDescription}
                  changeAssignedTo={this.changeAssignedTo}
                  changeDueDate={this.changeDueDate}
                  changeCompleted={this.changeCompleted}
                  confirmItemChanges={this.confirmItemChanges}
                  cancelItemChanges={this.cancelItemChanges} />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;
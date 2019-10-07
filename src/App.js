import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
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
    console.log("removed");
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
    console.log("prepended");
    let todoLists = this.state.todoLists;
    todoLists.unshift(listToPrepend);
    this.setState({todoLists});
    
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList} 
        todoLists={this.state.todoLists}
        removeList={this.removeList} 
        prependList={this.prependList} />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          changeName={this.changeName}
          changeOwner={this.changeOwner} />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;
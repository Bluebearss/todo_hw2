import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return name;
        }
        else
            return "Unnknown";
    }

    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return owner;
        }
        else
            return "Unknown";
    }

    render() {
        return (
            <div id="todo_list">
                <br /> 
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            value={this.getListName()}
                            onChange={this.props.changeName}
                            type="text" 
                            id="list_name_textfield" />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={this.getListOwner()}
                            onChange={this.props.changeOwner}
                            type="text" 
                            id="list_owner_textfield" />
                    </div>
                </div>
                <ListItemsTable 
                todoList={this.props.todoList}
                isCurrentItemSortCriteria={this.props.isCurrentItemSortCriteria}
                sortTasks={this.props.sortTasks}
                ItemSortCriteria={this.props.ItemSortCriteria}
                swapItems={this.props.swapItems}
                getPrevOrNextItemKey={this.props.getPrevOrNextItemKey}
                deleteItem={this.props.deleteItem}
                createNewItemOnClick={this.props.createNewItemOnClick}
                editItem={this.props.editItem} />
            </div>
        )
    }
}

export default ListScreen

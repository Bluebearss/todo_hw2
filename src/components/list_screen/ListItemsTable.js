import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    processSortItemsByTask = () =>
    {
        let taskIncreasing = this.props.ItemSortCriteria.SORT_BY_TASK_INCREASING;
        let taskDecreasing = this.props.ItemSortCriteria.SORT_BY_TASK_DECREASING;

        if (this.props.isCurrentItemSortCriteria(taskIncreasing))
        {
            this.props.sortTasks(taskDecreasing);
        }
        else
        {
            this.props.sortTasks(taskIncreasing);
        }
    }

    processSortItemsByDueDate = () =>
    {
        let dueDateIncreasing = this.props.ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING;
        let dueDateDecreasing = this.props.ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING;

        if (this.props.isCurrentItemSortCriteria(dueDateIncreasing))
        {
            this.props.sortTasks(dueDateDecreasing);
        }
        else
        {
            this.props.sortTasks(dueDateIncreasing);
        }
    }

    processSortItemsByStatus = () =>
    {
        let statusIncreasing = this.props.ItemSortCriteria.SORT_BY_STATUS_INCREASING;
        let statusDecreasing = this.props.ItemSortCriteria.SORT_BY_STATUS_DECREASING;

        if (this.props.isCurrentItemSortCriteria(statusIncreasing))
        {
            this.props.sortTasks(statusDecreasing);
        }
        else
        {
            this.props.sortTasks(statusIncreasing);
        }
    }

    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div 
                    className="list_item_task_header"
                    onClick={this.processSortItemsByTask}>Task</div>

                    <div 
                    className="list_item_due_date_header"
                    onClick={this.processSortItemsByDueDate}>Due Date</div>

                    <div 
                    className="list_item_status_header"
                    onClick={this.processSortItemsByStatus}>Status</div>
                </div>

                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            listItem={todoItem}
                            key={todoItem.key}
                            swapItems={this.props.swapItems}
                            getPrevOrNextItemKey={this.props.getPrevOrNextItemKey}
                            deleteItem={this.props.deleteItem} />
                    ))
                }
            </div>
        )
    }
}

export default ListItemsTable

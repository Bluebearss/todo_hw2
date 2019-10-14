import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    getItemDescription()
    {
        if (this.props.todoItem)
        {
            let description = this.props.todoItem.description;
            return description;
        }
        else
        {
            return "Unknown";
        }
    }

    getItemAssignedTo()
    {
        if (this.props.todoItem)
        {
            let assignedTo = this.props.todoItem.assigned_to;
            return assignedTo;
        }
        else
        {
            return "Unknown";
        }
    }

    getItemDueDate()
    {
        if (this.props.todoItem)
        {
            let dueDate = this.props.todoItem.due_date;
            return dueDate;
        }
        else
        {
            return "Unknown";
        }
    }

    getItemCompleted()
    {
        if (this.props.todoItem)
        {
            let completed = this.props.todoItem.completed;
            return completed;
        }
        else
        {
            return false;
        }
    }

    render() {
        return (
            <div id = "todo_item">
                <div id = "item_form_container">
                    <div id = "item_heading">Item</div>
                    <div id = "item_description_container">
                        <label id = "item_description_prompt">Description:</label>
                        <input 
                        value={this.getItemDescription()}
                        onChange={this.props.changeDescription}
                        type = "text" 
                        id = "item_description_textfield" />
                    </div>
                    <div id = "item_assigned_to_container">
                        <label id = "item_assigned_to_prompt">Assigned To:</label>
                        <input 
                        value={this.getItemAssignedTo()}
                        onChange={this.props.changeAssignedTo}
                        type = "text" 
                        id = "item_assigned_to_textfield" />
                    </div>
                    <div id = "item_due_date_container">
                        <label id = "item_due_date_prompt">Due Date:</label>
                        <input 
                        value={this.getItemDueDate()}
                        onChange={this.props.changeDueDate}
                        type = "date" 
                        id = "item_due_date_picker" />
                    </div>
                    <div id = "item_completed_container">
                        <label id = "item_completed_prompt">Completed:</label>
                        <input 
                        checked={this.getItemCompleted()}
                        onChange={this.props.changeCompleted}
                        type = "checkbox" 
                        id = "item_completed_checkbox" />
                    </div>
                    <div id = "item_form_button_container">
                        <button 
                        id = "item_form_submit_button"
                        onClick={this.props.confirmItemChanges}>Submit</button>
                        <button 
                        id = "item_form_cancel_button"
                        onClick={this.props.cancelItemChanges}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    todoItem: PropTypes.object.isRequired,
    changeDescription: PropTypes.func.isRequired,
    changeAssignedTo: PropTypes.func.isRequired,
    changeDueDate: PropTypes.func.isRequired,
    changeCompleted: PropTypes.func.isRequired,
    confirmItemChanges: PropTypes.func.isRequired,
    cancelItemChanges: PropTypes.func.isRequired 
}

export default ItemScreen

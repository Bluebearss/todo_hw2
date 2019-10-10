import React, { Component } from 'react'
import MoveUp from '../images/icons/MoveUp.png';
import MoveDown from '../images/icons/MoveDown.png';
import Close from '../images/icons/Close.png';

export class ListItemCard extends Component {
    getCompleted()
    {
        if (this.props.listItem.completed)
        {
            return <div className = "list_item_card_completed">Completed</div>
        }
        else
        {
            return <div className = "list_item_card_not_completed">Pending</div>
        }
    }

    moveItemUp = (moveUpItemKey) =>
    {
        let prevMoveUpItemKey = this.props.getPrevOrNextItemKey(moveUpItemKey, -1);

        if (prevMoveUpItemKey != null)
        {
            this.props.swapItems(prevMoveUpItemKey, moveUpItemKey);
        }
    }

    moveItemDown = (moveDownItemKey) =>
    {
        let nextMoveDownItemKey = this.props.getPrevOrNextItemKey(moveDownItemKey, 1);

        if (nextMoveDownItemKey != null)
        {
            this.props.swapItems(moveDownItemKey, nextMoveDownItemKey);
        }
    }

    render() {
        return (
            <div className='list_item_card'>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                {this.getCompleted()}
                <div id = "list_move_item_buttons_container">
                    <img 
                    src={MoveUp} 
                    alt="MoveUpButton"
                    className="list_item_card_move_item_up_button"
                    onClick={this.moveItemUp.bind(this, this.props.listItem.key)}>
                    </img>
                    <img 
                    src={MoveDown} 
                    alt="MoveDownButton"
                    className="list_item_card_move_item_down_button"
                    onClick={this.moveItemDown.bind(this, this.props.listItem.key)}>
                    </img>
                    <img 
                    src={Close} 
                    alt="DeleteButton"
                    className="list_item_card_delete_item_button"
                    onClick={this.props.deleteItem.bind(this, this.props.listItem.key)}>
                    </img>
                </div>
            </div>
        )
    }
}

export default ListItemCard

import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ModalContainer extends Component {
    hideDialog = () =>
    {
        let dialog = document.getElementById("modal_yes_no_dialog");
        dialog.classList.remove("is_visible");
        dialog.classList.add("is_not_visible");

        setTimeout(function()
        {
            dialog.style.display = "none";
            document.getElementById("modal_yes_no_dialog_container").style.display = "none";
        }, 680);
    }

    confirmDeleteList = () => 
    {
        this.props.removeList(this.props.todoList);

        this.hideDialog();

        setTimeout(this.props.goHome, 680);
    }

    render() {
        return (
            <div id="modal_yes_no_dialog_container">
                <div id="modal_yes_no_dialog">
                    <div>Delete list?</div><br /><br />
                    <p><strong>Are you sure you want to delete this list?</strong></p><br />
                    <button 
                    id="modal_yes_button"
                    onClick={this.confirmDeleteList}>Yes</button>
                    <button 
                    id="modal_no_button"
                    onClick={this.hideDialog}>No</button><br /><br />
            
                    <div>The list will not be retreivable.</div>
                </div>
            </div>
        )
    }
}

ModalContainer.propTypes = {
    todoList: PropTypes.object.isRequired,
    removeList: PropTypes.func.isRequired,
    goHome: PropTypes.func.isRequired
}

export default ModalContainer
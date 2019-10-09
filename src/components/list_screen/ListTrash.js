import React, { Component } from 'react'
import { list } from 'postcss'

export class ListTrash extends Component {
    showDialogStyle = () =>
    {
        document.getElementById("modal_yes_no_dialog_container").style.display = "block";
        document.getElementById("modal_yes_no_dialog").style.display = "block";
        let dialog = document.getElementById("modal_yes_no_dialog");
        dialog.classList.remove("is_not_visible");
        dialog.classList.add("is_visible");
    }

    render() {
        return (
            <div 
            id="list_trash"
            onClick={this.showDialogStyle}>&#x1f5d1;</div>
        )
    }
}

export default ListTrash

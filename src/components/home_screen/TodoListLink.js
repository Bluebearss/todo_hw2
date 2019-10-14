import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoListLink extends Component {

    onClickHandle = (event) =>
    {
        this.props.loadList(this.props.todoList);
        this.props.removeList(this.props.todoList);
        this.props.prependList(this.props.todoList);
    }

    render() {        
        return (
            <a 
                className='home_list_link'
                onClick={this.onClickHandle}
            >
                {this.props.todoList.name}<br /><br />
            </a>
        )
    }
}

TodoListLink.propTypes = {
    loadList: PropTypes.func.isRequired,
    todoList: PropTypes.object.isRequired,
    removeList: PropTypes.func.isRequired,
    prependList: PropTypes.func.isRequired,
}

export default TodoListLink

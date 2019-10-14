import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ListHeading extends Component {
    render() {
        return (
            <div id="list_heading"
                onClick={this.props.goHome}
            >   @todo
            </div>
        )
    }
}

ListHeading.propTypes = {
    goHome: PropTypes.func.isRequired
}

export default ListHeading

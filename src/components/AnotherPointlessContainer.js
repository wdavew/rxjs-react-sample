import React, { Component } from 'react';

export default class AnotherPointlessContainer extends Component {
  render() {
    const {image} = this.props;
    return (
      <div className="pointless-container">
        Your selected image: {image}
      </div>
    )
  }
}
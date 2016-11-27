const Rx = require('rxjs/Rx');
import React, { Component } from 'react';

const mapStreamsToComponent = (componentDefinition, streams) => {
  return Rx.Observable.combineLatest(...streams, componentDefinition)
}

export default function (componentDefinition, ...streams) {
  return class extends Component {
    state = { domElement: null }

    static contextTypes = { upstream: React.PropTypes.object.isRequired }

    componentWillMount() {
      const upstream = this.context.upstream;
      const filteredStreams = streams.map(actionType => upstream.filterForAction(actionType));
      const component$ = mapStreamsToComponent(componentDefinition, filteredStreams)
      this.subscription = component$.subscribe((domElement) => {
        this.setState({ domElement });
      });
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      return this.state.domElement;
    }

  }
}

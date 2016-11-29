const Rx = require('rxjs/Rx');
import React, { Component } from 'react';

const mapStreamsToProps = (filteredStreams, streamNames) => {
  return Rx.Observable.combineLatest(...filteredStreams, (...filteredStreams) => {
    return streamNames.reduce((accum, curr, idx) => {
      accum[curr] = filteredStreams[idx]
      return accum;
    }, {});
  })
}

export default function (componentDefinition, ...streams) {
  return class extends Component {

    constructor(props, context) {
      super();
      this.state = { childProps: {} }
      this.dispatch = context.upstream.dispatch.bind(context.upstream);
      this.logHistory = context.upstream.logHistory.bind(context.upstream);
      this.upstream = context.upstream;
    }

    static contextTypes = { upstream: React.PropTypes.object.isRequired }
    componentDidMount(context) {
      const filteredStreams = streams.map(actionType => this.upstream.filterForAction(actionType).startWith(null));
      const component$ = mapStreamsToProps(filteredStreams, streams)
      this.subscription = component$.subscribe((props) => {
        this.setState({ childProps: props });
      });
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      return React.createElement(componentDefinition,
        Object.assign(this.state.childProps, { dispatch: this.dispatch, logHistory: this.logHistory }),
        null);
    }
  }
}

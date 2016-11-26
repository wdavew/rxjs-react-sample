const Rx = require('rxjs/Rx');
import { Component } from 'react';

const mapStreamsToComponent = (componentDefinition, ...streams) => {
  return Rx.Observable.combineLatest(...streams, componentDefinition)
}

export default function (componentDefinition, ...streams) {
  const component$ = mapStreamsToComponent(componentDefinition, ...streams)
  component$.subscribe(data => console.log('receiving', data))
  return class extends Component {
    state = { domElement: null }

    componentWillMount() {
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

import React, { Component } from 'react';
import { Charts } from '../../components/index';

export default class ExamplePage extends Component {
  constructor() {
    super();
    this.state = {
        option: {
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
          }]
      }
    };
}
  render() {
    return (
      <Charts
        ref={node => {
            this.barcharts = node;
        }}
        option={this.state.option}
        style={{ width: '98%', height: 270 }}
      />
    );
  }
}

import React, { Component } from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';

import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

export default class Charts extends Component {
    render() {
        return (
            <ReactEchartsCore
                ref={node => {
                    this.base = node;
                }}
                echarts={echarts}
                {...this.props}
            />
        );
    }
}

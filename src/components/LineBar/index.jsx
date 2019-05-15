import React, { Component } from 'react';
import Charts from '../Charts';
import Error from '../Error';
import { lineBarOption } from './option';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';
import { percentConversion, isUP, thousandSeparates } from '../../utils/utils';
import _ from 'lodash';
import './linebar.scss';

class LineBar extends Component {
    constructor() {
        super();
        this.state = {
            option: lineBarOption
        };
    }
    componentDidMount() {
        this.getData(this.props);
        this.init = this.barcharts.base.getEchartsInstance();
        window.addEventListener('resize', this.resize, false);
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.barData, this.props.barData) || nextProps.title !== this.props.title) {
            this.getData(nextProps);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
    resize = () => {
        this.init && this.init.resize();
    };
    getData = props => {
        const o_ = JSON.stringify(this.state.option);
        const o = JSON.parse(o_);
        o.title.text = props.title;
        o.title.left = props.titlePos ? props.titlePos : 'center';
        o.legend.data = props.barData.concat(props.lineData).map(item => ({ name: item.name, icon: 'circle' }));
        o.xAxis[0].data = props.xData;
        o.yAxis[0].name = props.yTitle1;
        o.yAxis[1].name = props.yTitle2;
        const barData = props.barData.map(item => {
            const obj = {
                name: item.name,
                type: 'bar',
                itemStyle: {
                    barBorderRadius: 30
                },
                barMaxWidth: 30,
                barMinHeight: 3,
                data: item.data
            };
            return obj;
        });
        const lineData = props.lineData.map(item => {
            const obj = {
                name: item.name,
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    color:
                        props.lineData.length < 2 &&
                        new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                            { offset: 0, color: '#FE454C' },
                            { offset: 0.5, color: '#8667F5 ' },
                            { offset: 1, color: '#F35DFB ' }
                        ])
                },
                lineStyle: {
                    width: 5
                },
                symbol: 'none',
                data: item.data
            };
            return obj;
        });
        o.series = barData.concat(lineData);
        o.tooltip.formatter = params => {
            let str = params[0].axisValue;
            params.forEach((item, i) => {
                const ratio_ =
                    props.barData.concat(props.lineData)[i].ratio &&
                    props.barData.concat(props.lineData)[i].ratio[params[i].dataIndex];
                const ratio = ratio_ || '';
                const { propClass, value } = isUP(ratio);
                const svg = `<span class=${propClass}></span>`;
                const rat = `<span>${(value + '').indexOf('-') > -1 ? value + '-' : percentConversion(+value)}</span>`;
                const marker =
                    "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#8667F5;'></span>";
                const s_ = `<br /><span class="tooltip-box">${item.marker ? item.marker : marker} ${
                    item.seriesName
                }: ${thousandSeparates(+item.value)}  ${ratio &&
                    `; ` + ((value + '').indexOf('-') > -1 ? '' : svg) + rat} </span>`;
                str += s_;
            });
            return str;
        };
        this.setState({ option: o });
    };
    render() {
        let noData = true;
        for (const ele of this.props.barData) {
            if (ele.data.length) {
                noData = false;
                break;
            }
        }
        return (
            <div className="line-bar">
                {noData ? (
                    <div className="no-data-box">
                        <h4>{this.props.title}</h4>
                        <Error />
                    </div>
                ) : (
                    ''
                )}
                <div style={{ visibility: noData ? 'hidden' : '' }}>
                    <Charts
                        ref={node => (this.barcharts = node)}
                        option={this.state.option}
                        style={{ width: '100%', height: 300 }}
                    />
                </div>
            </div>
        );
    }
}
LineBar.propTypes = {
    barData: PropTypes.array,
    title: PropTypes.string
};
export default LineBar;

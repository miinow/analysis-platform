import React, { Component } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';
import { Charts } from '../../components';
import { lineOption } from './lineOption';
import Error from '../Error';
import _ from 'lodash';

class BasicLine extends Component {
    constructor() {
        super();
        this.state = {
            option: lineOption,
            empty: 0
        };
    }
    componentDidMount() {
        this.handleData(this.props);
        this.oWindowH = window.innerWidth;
        const { lineData } = this.props;
        if (lineData.length > 0) {
            this.init = this.charts && this.charts.base && this.charts.base.getEchartsInstance();
            window.addEventListener('resize', this.resize, false);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.lineData, this.props.lineData)) {
            this.handleData(nextProps);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => {
        this.init && this.init.resize();
        this.oWindowH = window.innerWidth;
    };

    handleData = data => {
        const { title, unit } = this.props;
        const { lineData, lineXData } = data;
        const { option } = this.state;
        const o_ = _.cloneDeep(option);
        o_.legend = {
            show: false
        };
        // 标题
        o_.title.text = title;
        o_.title.textStyle = {
            fontSize: 16,
            color: '#DFEAFC'
        };
        // x轴
        o_.xAxis.type = 'category';
        o_.xAxis.data = lineXData;
        o_.xAxis.axisLabel = {
            interval: 0,
            // formatter(value) {
            //     return value.split("").join("\n");
            // },
            textStyle: {
                fontFamily: 'PingFangSC-Regular',
                fontSize: 12,
                color: '#DFEAFC'
            },
            margin: 24,
            align: 'center'
        };
        // o_.xAxis.splitLine = {
        //     show: true
        // };
        // o_.xAxis.axisPointer = {
        //     show: true
        // };
        o_.xAxis.axisLine = {
            lineStyle: {
                width: 1,
                color: 'rgba(255,255,255,0.10)'
            }
        };
        o_.xAxis.axisTick = {
            show: false
        };
        // y轴
        o_.yAxis.name = unit || '';
        o_.yAxis.nameTextStyle = {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 14,
            color: '#DFEAFC',
            align: 'center',
            padding: [3, 4, 5, -10]
        };
        o_.yAxis.nameGap = 16;
        o_.yAxis.axisLine = {
            show: false
        };
        o_.yAxis.axisTick = {
            show: false
        };
        o_.yAxis.axisLabel = {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 14,
            color: '#DFEAFC',
            textAlign: 'right'
        };
        // 横向分割线
        o_.yAxis.splitLine = {
            show: true,
            lineStyle: {
                width: 1,
                color: 'rgba(255,255,255,0.10)'
            }
        };
        // o_.yAxis.axisPointer = {
        //     show: true,
        //     type: "line"
        // };
        // tooltip
        // 可以影响 marker的颜色
        o_.color = ['#FE454C'];
        o_.tooltip = {
            trigger: 'axis',
            padding: 10,
            backgroundColor: 'rgba(0,0,0,0.3)',
            formatter: params => {
                if (params && params.length > 0) {
                    let result = '';
                    result = '<div style="text-align: left; padding-bottom: 5px">' + params[0].name + '</div>';
                    params.forEach(item => {
                        const v = +item.value === 0 ? 0 : item.value + '次';
                        result +=
                            '<div style="text-align: left">' +
                            item.marker +
                            ' ' +
                            item.seriesName +
                            ' : ' +
                            v +
                            '</div>';
                    });
                    return result;
                }
            }
        };
        // series
        lineData.length > 0 &&
            lineData.forEach((item, index) => {
                if (o_.series[index] && o_.series[index].data) {
                    o_.series[index].data = item;
                    o_.series[index] = {
                        ...o_.series[index],
                        name: '购买频次',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 4,
                                    type: 'solid',
                                    shadowColor: 'rgba(67,28,59,0.8)',
                                    shadowOffsetY: 5,
                                    shadowBlur: 6,
                                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        { offset: 0, color: '#FE454C' },
                                        { offset: 0.5, color: '#8667F5 ' },
                                        { offset: 1, color: '#F35DFB ' }
                                    ])
                                }
                            }
                        },
                        symbol: 'none',
                        smooth: true
                    };
                    this.setState({ option: o_, empty: item.length });
                } else {
                    this.setState({ option: o_ });
                }
            });
    };
    render() {
        const { option, empty } = this.state;
        const { diyClass, style } = this.props;
        return (
            <div className={diyClass || null}>
                {empty ? (
                    <Charts
                        ref={node => {
                            this.charts = node;
                        }}
                        option={option}
                        style={style}
                    />
                ) : (
                    <Error />
                )}
            </div>
        );
    }
}

BasicLine.propTypes = {
    diyClass: PropTypes.string, // 标题
    title: PropTypes.string, // 标题
    style: PropTypes.object, // 样式
    // lineXData: PropTypes.array, // 横坐标
    lineData: PropTypes.array, // 折线图 data
    unit: PropTypes.string // 单位
};

export default BasicLine;

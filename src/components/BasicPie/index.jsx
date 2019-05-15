import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Charts } from '../../components';
import { pieOption } from './pieOption';
import _ from 'lodash';
import { isArray } from 'zrender/lib/core/util';
import { convertRatio } from '../../utils/utils';
import Error from '../Error';

import up from '../../assets/image/up.png';
import down from '../../assets/image/down.png';

const fontColor = {
    up: '#4EA902',
    down: '#B42101'
};

class BasicPie extends Component {
    constructor() {
        super();
        this.state = {
            option: pieOption
        };
    }
    componentDidMount() {
        this.handleData(this.props);
        this.oWindowH = window.innerWidth;
        const { pieData } = this.props;
        if (pieData.length > 0) {
            this.init = this.charts.base.getEchartsInstance();
            window.addEventListener('resize', this.resize, false);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.pieData, this.props.pieData)) {
            this.handleData(nextProps);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => {
        this.init.resize();
        this.oWindowH = window.innerWidth;
    };

    handleData = data => {
        const { option } = this.state;
        const { type, title, color, center, radius, tooltip } = this.props;
        const o_ = _.cloneDeep(option);
        const { pieData } = data;

        // ---- 通用的设置
        // 标题
        o_.title.text = title;
        o_.title.x = 'left';
        o_.title.textStyle = {
            fontSize: 16,
            color: '#DFEAFC',
            fontWeight: 'normal'
        };
        // legend
        const legendData = [];
        pieData.forEach(element => {
            legendData.push(element.name);
        });
        o_.legend.data = legendData;
        o_.legend.textStyle = {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 14,
            color: '#DFEAFC'
        };

        // 设置圆心和半径
        o_.series[0].center = center;
        o_.series[0].radius = radius;

        o_.series[0].name = title;
        o_.series[0].data = pieData;

        // 是否设置渐变色
        if (isArray(color[0])) {
            o_.series[0].data.forEach((ele, index) => {
                ele.itemStyle = {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: color[index][0]
                            },
                            {
                                offset: 1,
                                color: color[index][1]
                            }
                        ],
                        global: false
                    }
                };
                ele.label = {
                    normal: {
                        color: color[index][0]
                    }
                };
            });
        } else {
            o_.series[0].color = color;
            o_.series[0].label = {
                normal: {
                    formatter(params) {
                        const { name, percent, data: Data } = params;
                        const { ratio } = Data;
                        if (ratio < 0) {
                            const formatRatio = convertRatio(ratio.toString().replace('-', ''));
                            return name + ':' + percent + '%' + ';' + '{down|}' + '{downColor|' + formatRatio + '}';
                        } else if (ratio === '--' || !ratio || ratio === '') {
                            return name + ':' + percent + '%';
                        } else {
                            const formatRatio = convertRatio(ratio.toString());
                            return name + ':' + percent + '%' + ';' + '{up|}' + '{upColor|' + formatRatio + '}';
                        }
                    },
                    rich: {
                        upColor: {
                            color: '#4EA902',
                            align: 'center',
                            padding: [3, 0]
                        },
                        downColor: {
                            color: '#B42101',
                            align: 'center',
                            padding: [3, 0]
                        },
                        up: {
                            backgroundColor: {
                                image: up
                            }
                        },
                        down: {
                            backgroundColor: {
                                image: down
                            }
                        }
                    }
                }
            };
        }
        // label
        o_.series[0].label = {
            normal: {
                formatter(params) {
                    const { name, percent, data: Data } = params;
                    const { ratio } = Data;
                    if (ratio < 0) {
                        const formatRatio = convertRatio(ratio.toString().replace('-', ''));
                        return name + ':' + percent + '%' + ';' + '{down|}' + '{downColor|' + formatRatio + '}';
                    } else if (ratio === '--' || !ratio || ratio === '') {
                        return name + ':' + percent + '%';
                    } else {
                        const formatRatio = ratio && convertRatio(ratio.toString());
                        return name + ':' + percent + '%' + ';' + '{up|}' + '{upColor|' + formatRatio + '}';
                    }
                },
                rich: {
                    upColor: {
                        color: '#4EA902',
                        align: 'center',
                        padding: [3, 0]
                    },
                    downColor: {
                        color: '#B42101',
                        align: 'center',
                        padding: [3, 0]
                    },
                    up: {
                        backgroundColor: {
                            image: up
                        }
                    },
                    down: {
                        backgroundColor: {
                            image: down
                        }
                    }
                }
            }
        };

        // 设置三种饼图的类型
        switch (type) {
            case 'rose':
                o_.series[0].roseType = 'radius';
                break;
            case 'area':
                o_.series[0].label = {
                    formatter: '{b}'
                };
                break;
            default:
                o_.tooltip.show = false;
                break;
        }
        if (tooltip) {
            o_.tooltip.formatter = function(params) {
                const { marker, name, percent, data: Data } = params;
                const { ratio } = Data;
                const arrow = ratio < 0 ? down : up;
                const formatRatio = convertRatio(ratio.toString().replace('-', ''));
                const ratioStr =
                    ratio < 0
                        ? ` <span  style='color:#B42101'>${formatRatio}</span>`
                        : `<span  style='color:#4EA902'>${formatRatio}</span>`;
                const str = `
                <div>
                    ${marker}
                    <span>${name}</span>:
                    <span>${percent}%</span>;
                    <image src=${arrow} style='margin-bottom:4px;' />
                    ${ratioStr}
                    
                </div>`;
                return str;
            };
        } else {
            o_.tooltip.show = false;
        }

        this.setState({ option: o_ });
    };
    render() {
        const { option } = this.state;
        const { diyClass, style } = this.props;
        return (
            <div className={diyClass || null} style={{ padding: 20 }}>
                {this.props.pieData.length ? (
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

BasicPie.defaultProps = {
    center: ['50%', '50%'],
    radius: ['0%', '60%'],
    tooltip: false
};

BasicPie.propTypes = {
    diyClass: PropTypes.string, // class
    type: PropTypes.string, // 饼图的类型  rose(南丁格尔) 不传类型就是基本的饼图
    title: PropTypes.string, // 标题
    pieData: PropTypes.array, // 饼图数据 data
    style: PropTypes.object, // 样式
    color: PropTypes.array, // 颜色
    center: PropTypes.array, // 饼图的中心（圆心）坐标
    radius: PropTypes.array, // 半径,可以设置成圆环
    tooltip: PropTypes.bool // 是否显示tooltip
};

export default BasicPie;

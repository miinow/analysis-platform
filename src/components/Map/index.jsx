import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Charts } from '../../components/index';
import classNames from 'classnames';
import './map.scss';
import mapOption from './mapOption';
import { toThousands, isUpOrDown } from '../../utils/utils';
import _ from 'lodash';

require('echarts/map/js/china.js');

class MapChart extends PureComponent {
    constructor() {
        super();
        this.state = {
            option: mapOption,
            setOrderColor: true,
            setSaleColor: false
        };
    }
    componentDidMount() {
        this.handleData(this.props.mapData.dataOrder);
        this.init = this.mapcharts.base.getEchartsInstance();
        window.addEventListener('resize', this.resize, false);
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.mapData, this.props.mapData)) {
            this.handleData(nextProps.mapData.dataOrder);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
    resize = () => {
        this.init.resize();
    };
    handleSvg = v => {
        if (isUpOrDown(v).flag === 1) {
            return '<span class="arrow-green"><i> </i>' + isUpOrDown(v).value + '</span>';
        } else if (isUpOrDown(v).flag === 2) {
            return '<span class="arrow-red"><i> </i>' + isUpOrDown(v).value + '</span>';
        } else {
            return '<span class="arrow-no">' + isUpOrDown(v).value + '</span>';
        }
    };
    htmlType = (name, value, quota) => {
        //     <div className="tooltip">
        //         <span>{name}:</span>
        //         <span>{this.handleFormat(value)};</span
        //         <span className={className}>{this.svg(className)}</span>
        //     <span className={className}>{quato}</span>
        // </div>
        return (
            '<div class="tooltip"><span class="font">' +
            name +
            ' : ' +
            this.handleFormat(value) +
            ' ;</span> ' +
            this.handleSvg(quota) +
            '</div>'
        );
    };
    handleData = (data, v) => {
        // const o = JSON.stringify(this.state.option);
        // const o_ = JSON.parse(o);
        const o = this.state.option;
        const o_ = _.cloneDeep(o);
        o_.tooltip = {
            trigger: 'item',
            padding: 12,
            backgroundColor: 'rgba(0,0,0,1)',
            formatter: params => {
                const { city } = this.props.mapData;
                if (params && city && Object.keys(city).length > 0) {
                    let result = '';
                    if (params.seriesName === '订单量/万') {
                        city[params.name] &&
                            city[params.name].order &&
                            city[params.name].order.map((item, index) => {
                                // result += '<div>' +
                                //        item.name + ' : ' + this.handleFormat(item.value) + ' ; ' + item.quota + '</div>';
                                result += this.htmlType(item.name, item.value, item.quota);
                            });
                    } else {
                        city[params.name] &&
                            city[params.name].sale &&
                            city[params.name].sale.map((item, index) => {
                                // result += '<div style="text-align: left">' +
                                //     item.name + ' : ' + this.handleFormat(item.value) + ' ; ' + item.quota + '</div>';
                                result += this.htmlType(item.name, item.value, item.quota);
                            });
                    }
                    return result;
                }
            }
        };
        o_.title.show = false;
        // 背景色
        o_.backgroundColor = '';
        o_.series[0] = {
            ...o_.series[0],
            name: v ? '销售额/万' : '订单量/万',
            data
        };
        this.setState({ option: o_ });
    };
    handleFormat = num => {
        num += '';
        if (num === '0') {
            return 0;
        } else if (!isNaN(num) && num.indexOf('.') > -1) {
            const cur = num.split('.');
            return `${toThousands(cur[0])}.${cur[1]}`;
        } else if (!isNaN(num) && num.indexOf('.') === -1) {
            return toThousands(num);
        } else {
            return num;
        }
    };
    changeData = (e, v) => {
        const { dataSale, dataOrder } = this.props.mapData;
        const { setOrderColor, setSaleColor } = this.state;
        if (v === 'order' && !setOrderColor) {
            this.handleData(dataOrder, !v);
            this.setState({
                setSaleColor: !setSaleColor,
                setOrderColor: !setOrderColor
            });
        } else if (v !== 'order' && !setSaleColor) {
            this.handleData(dataSale, !v);
            this.setState({
                setSaleColor: !setSaleColor,
                setOrderColor: !setOrderColor
            });
        }
    };
    render() {
        const { setOrderColor, setSaleColor, option } = this.state;
        return (
            <div className="map-charts">
                <div className="clear">
                    <div className="fl">城市销售分布</div>
                    <div className="fr">
                        <span
                            onClick={e => this.changeData(e, 'order')}
                            className={classNames({
                                'ring-order': true,
                                high: setOrderColor
                            })}
                        >
                            订单量/万
                        </span>
                        <span
                            onClick={this.changeData}
                            className={classNames({
                                ring: true,
                                high: setSaleColor
                            })}
                        >
                            销售额/万
                        </span>
                    </div>
                </div>
                <Charts
                    ref={node => {
                        this.mapcharts = node;
                    }}
                    option={option}
                    style={{ width: '100%', height: 400 }}
                />
            </div>
        );
    }
}
MapChart.propTypes = {
    mapData: PropTypes.object
};
export default MapChart;

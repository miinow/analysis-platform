import React, { Component } from 'react';
import Charts from '../Charts';
import { stackBarOption } from './option';
import PropTypes from 'prop-types';
import { isUP, percentConversion, thousandSeparates } from '../../utils/utils';
import _ from 'lodash';
import './stackbar.scss';
import Error from '../Error';

class StackBar extends Component {
    constructor() {
        super();
        this.state = {
            option: {}
        };
    }
    componentDidMount() {
        this.getData(this.props);
        this.init = this.barcharts.base.getEchartsInstance();
        window.addEventListener('resize', this.resize, false);
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.barData, this.props.barData) || nextProps.title !== this.props.title) {
            console.log('nextProps', nextProps);
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
        // const o_ = JSON.stringify(this.state.option);
        // const o = JSON.parse(o_);
        const o = _.cloneDeep(stackBarOption);
        o.title.text = props.title;
        o.title.left = props.titlePos ? props.titlePos : 'left';
        o.yAxis[0].name = props.yTitle1 || '';
        o.series = props.barData.map(item => {
            const obj = {
                name: item.name,
                type: 'bar',
                stack: '总量',
                barMaxWidth: 30,
                data: item.data
            };
            return obj;
        });
        const colors6 = ['#1A7EC6', '#03ACC1', '#44A047', '#C0CA33', '#E53936', '#FE6521'];
        const colors3 = ['#1E7DDE ', '#29C7EC ', '#FD705A '];
        o.color = props.barData.length > 3 ? colors6 : colors3;
        o.legend.data = props.barData.map(item => ({ name: item.name, icon: 'circle' }));
        o.xAxis[0].data = props.xData;
        o.tooltip.formatter = params => {
            let str = params[0].axisValue;
            params.forEach((item, i) => {
                const ratio_ = props.barData[i].ratio && props.barData[i].ratio[params[i].dataIndex];
                const ratio = ratio_ || '';
                const { propClass, value } = isUP(ratio);
                const svg = `<span class=${propClass}></span>`;
                const rat = `<span>${(value + '').indexOf('-') > -1 ? value + '-' : percentConversion(value)}</span>`;
                const s_ = `<br /><span class="tooltip-box">${item.marker} ${item.seriesName}: ${thousandSeparates(
                    +item.value
                )}  ${ratio && `; ` + ((value + '').indexOf('-') > -1 ? '' : svg) + rat} </span>`;
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
        // console.log('option: ', this.state.option);
        return (
            <div className="stack-bar">
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
StackBar.propTypes = {
    barData: PropTypes.array,
    title: PropTypes.string
};
export default StackBar;

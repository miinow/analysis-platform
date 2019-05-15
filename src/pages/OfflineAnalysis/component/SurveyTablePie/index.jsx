import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TableList, BasicPie } from '../../../../components';
import { OfflineSalesColumns } from '../../config/tableConfig';
import _ from 'lodash';

class SurveyTablePie extends Component {
    constructor() {
        super();
        this.time = {
            current_value: '当期',
            compare_value: '对比区间',
            ratio: ''
        };
    }

    componentDidMount() {
        this.time = {
            ...this.time,
            ratio: this.props.unit
        };
    }
    componentWillReceiveProps(nextProps) {
        if (
            !_.isEqual(nextProps.surveyTable, this.props.surveyTable) ||
            !_.isEqual(nextProps.surveyChart, this.props.surveyChart)
        ) {
            this.time = {
                ...this.time,
                ratio: this.props.unit
            };
        }
    }
    shouldComponentUpdate(nextProps) {
        return (
            !_.isEqual(nextProps.surveyTable, this.props.surveyTable) ||
            !_.isEqual(nextProps.surveyChart, this.props.surveyChart)
        );
    }
    getOfflineSales = res => {
        const temp = [];
        let result_ = [];
        Object.keys(res).length > 0 &&
            Object.keys(res).forEach(key => {
                Object.keys(res[key]).forEach((item, i) => {
                    const o = {
                        key: i,
                        time: item,
                        [key]: res[key][item]
                    };
                    temp.push(o);
                });
            });
        const data = JSON.parse(JSON.stringify(temp));
        const obj = {};
        temp.length > 0 &&
            temp.forEach(item => {
                data.length > 0 &&
                    data.forEach((k, i) => {
                        if (k.key === item.key) {
                            obj[item.key] = Object.assign(k, item);
                        }
                    });
            });
        const result = Object.values(obj);
        if (result.length > 0) {
            result_ = result.map(item => {
                item.time = this.time[item.time];
                return item;
            });
        }
        return result_;
    };
    handleData = (tableData, chart) => {
        const offlineSales = this.getOfflineSales(tableData);
        const channelData = [];
        chart.length > 0 &&
            chart.map(item => {
                const { channel_code, ratio, sale_total_amount } = item;
                channelData.push({
                    value: sale_total_amount,
                    name: channel_code,
                    ratio
                });
            });
        return { offlineSales, channelData };
    };

    render() {
        const { surveyTable, surveyChart } = this.props;
        const { offlineSales, channelData } = this.handleData(surveyTable, surveyChart);
        return (
            <div className="situation-chart clear">
                <div className="table half fl">
                    <TableList
                        tableDataSource={offlineSales}
                        columns={OfflineSalesColumns}
                        tableTitle="线下整体销售情况"
                    />
                </div>
                <div className="chart half fr">
                    <BasicPie
                        diyClass="singleLine"
                        title="线下各渠道销售额占比"
                        style={{ width: '100%', height: 176 }}
                        center={['50%', '60%']}
                        color={[['#9C5DFD', '#0B74F6'], ['#FE4978 ', '#F66035']]}
                        pieData={channelData}
                    />
                </div>
            </div>
        );
    }
}

SurveyTablePie.propTypes = {
    surveyTable: PropTypes.any,
    surveyChart: PropTypes.any,
    unit: PropTypes.string
};
export default SurveyTablePie;

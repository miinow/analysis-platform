import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BasicPie, TableList } from '../../../components';
import _ from 'lodash';
import { DifferentBuyFrequency } from '../config/tableConfig';

class PurchaseTrend extends Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.buy, this.props.buy) || !_.isEqual(nextProps.buyFreq, this.props.buyFreq);
    }
    handleData = data => {
        const buyFrequency = [];
        data.length > 0 &&
            data.map(item => {
                const { name, val, ratio } = item;
                buyFrequency.push({
                    value: val,
                    name,
                    ratio: ratio || '--'
                });
            });
        return { buyFrequency };
    };
    handleBuyFrequency = res => {
        const tableList = res && res instanceof Array && res.map((item, i) => ({ key: i, ...item }));
        return { tableList };
    };

    render() {
        const { buy, buyFreq } = this.props;
        const { buyFrequency } = this.handleData(buy);
        const { tableList } = this.handleBuyFrequency(buyFreq);
        return (
            <div className="chart clear">
                <div className="pie half fl">
                    <BasicPie
                        diyClass="singleLine"
                        title="会员的购买频次分布"
                        style={{ width: '100%', height: 176 }}
                        center={['50%', '60%']}
                        radius={['20%', '60%']}
                        color={[
                            ['#00B2E4', '#64F3F9'],
                            ['#F6EB54 ', '#F5AF61'],
                            ['#A03DF4', '#BF70F5'],
                            ['#F36C9E', '#E73A72']
                        ]}
                        pieData={buyFrequency}
                    />
                </div>
                <div className="half fr">
                    <TableList
                        tableDataSource={tableList}
                        columns={DifferentBuyFrequency}
                        tableTitle="不同购买频次的会员量分布"
                    />
                </div>
            </div>
        );
    }
}

PurchaseTrend.propTypes = {
    buy: PropTypes.any,
    buyFreq: PropTypes.any
};
export default PurchaseTrend;

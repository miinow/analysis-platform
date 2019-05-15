import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StackBar, LineBar } from '../../../../components';
import _ from 'lodash';
import { xyName } from '../../config/config';

class RegionCate2 extends Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps, this.props);
    }
    handleSaleData = res => {
        const xData = Object.keys(res) || [];
        const t = [];
        Object.keys(res).length > 0 &&
            Object.keys(res).forEach(item => {
                res[item].forEach(key => {
                    t.push(key);
                });
            });
        const barData_ = t.reduce((acc, cur) => {
            const hasItem = acc.some(e => {
                const temp = e.cat_name === cur.cat_name;
                if (temp) {
                    cur.sale_total_amount
                        ? e.sale_total_amount.push(cur.sale_total_amount)
                        : e.sale_total_amount.push('');
                    cur.sale_total_amount_ratio
                        ? e.sale_total_amount_ratio.push(cur.sale_total_amount_ratio)
                        : e.sale_total_amount_ratio.push('');
                }
                return temp;
            });
            const create = e => {
                e.sale_total_amount = [e.sale_total_amount];
                e.sale_total_amount_ratio = [e.sale_total_amount_ratio];
                return e;
            };
            if (!hasItem) {
                acc.push(create(cur));
            }
            return acc;
        }, []);
        const barData = barData_.map(item => ({
            name: item.cat_name,
            data: item.sale_total_amount,
            ratio: item.sale_total_amount_ratio
        }));
        return { xData, barData };
    };
    handleLineData = res => {
        const xData1 = [];
        const lineData_ = { name: '销售额', data: [], ratio: [] };
        const barData_ = { name: '订单量', data: [], ratio: [] };
        res &&
            res.length > 0 &&
            res.forEach(item => {
                xData1.push(item.cat_name);
                lineData_.data.push(item.sale_total_amount);
                lineData_.ratio.push(item.sale_total_amount_ratio);
                barData_.data.push(item.order_cnt);
                barData_.ratio.push(item.order_cnt_ratio);
            });
        const barData1 = [barData_];
        const lineData = [lineData_];
        return { xData1, barData1, lineData };
    };

    render() {
        const { regionAndCat34, regionCateData, title, type } = this.props;
        const { xData, barData } = this.handleSaleData(regionCateData);
        const { xData1, barData1, lineData } = this.handleLineData(regionAndCat34);
        return (
            <div>
                {type ? (
                    <LineBar
                        title={title}
                        barData={barData1}
                        lineData={lineData}
                        xData={xData1}
                        yTitle1={xyName.yTitle1}
                        yTitle2={xyName.yTitle2}
                        titlePos="left"
                    />
                ) : (
                    <StackBar title={title} xData={xData} barData={barData} />
                )}
            </div>
        );
    }
}

RegionCate2.propTypes = {
    title: PropTypes.string,
    regionCateData: PropTypes.any,
    regionAndCat34: PropTypes.any,
    type: PropTypes.any
};
export default RegionCate2;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LineBar } from '../../../../components';
import _ from 'lodash';
import { xyName } from '../../config/config';

class DepartSale extends Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.departSale, this.props.departSale) || nextProps.title !== this.props.title;
    }
    handleSaleData = allData => {
        const departBar = [{ name: '订单量', data: [] }];
        const departLine = [{ name: '销售额', data: [] }];
        const departXData = [];
        allData.length > 0 &&
            allData.map((item, i) => {
                departBar[0].data.push(item.order_cnt);
                departLine[0].data.push(item.sale_total_amount);
                departXData.push(item.branch_name);
            });

        return {
            departBar,
            departLine,
            departXData
        };
    };
    render() {
        const { departSale, title } = this.props;
        const { departBar, departLine, departXData } = this.handleSaleData(departSale);
        console.log(title);
        return (
            <LineBar
                title={title}
                barData={departBar}
                lineData={departLine}
                xData={departXData}
                yTitle1={xyName.yTitle1}
                yTitle2={xyName.yTitle2}
            />
        );
    }
}

DepartSale.propTypes = {
    departSale: PropTypes.any,
    title: PropTypes.string
};
export default DepartSale;

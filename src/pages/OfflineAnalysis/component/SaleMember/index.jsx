import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LineBar } from '../../../../components';
import _ from 'lodash';
import { xyName } from '../../config/config';

class SaleMember extends Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps, this.props);
    }
    handleData = data => {
        const saleBarData = [{ name: '订单量', data: [] }];
        const saleLineData = [{ name: '销售额', data: [] }];
        const memberBarData = [{ name: '购买会员数', data: [] }];
        const memberLineData = [{ name: '新会员占比', data: [] }];
        const xData = [];
        data &&
            data.length > 0 &&
            data.map(item => {
                saleBarData[0].data.push(item.order_cnt);
                saleLineData[0].data.push(item.sale_total_amount);
                memberBarData[0].data.push(item.buy_user_cnt);
                memberLineData[0].data.push(item.new_per);
                xData.push(item[this.props.saleRadio]);
            });
        return {
            saleBarData,
            saleLineData,
            memberBarData,
            memberLineData,
            xData
        };
    };

    render() {
        const { tendency } = this.props;
        const { saleBarData, saleLineData, memberBarData, memberLineData, xData } = this.handleData(tendency);
        return (
            <div className="chart clear">
                <div className="line half fl">
                    <LineBar
                        title="销售趋势"
                        barData={saleBarData}
                        lineData={saleLineData}
                        xData={xData}
                        yTitle1={xyName.yTitle1}
                        yTitle2={xyName.yTitle2}
                    />
                </div>
                <div className="half fr">
                    <LineBar
                        title="购买会员趋势"
                        barData={memberBarData}
                        lineData={memberLineData}
                        xData={xData}
                        yTitle1={xyName.yTitle1}
                        yTitle2={xyName.yTitle2}
                    />
                </div>
            </div>
        );
    }
}

SaleMember.propTypes = {
    tendency: PropTypes.any,
    saleRadio: PropTypes.string
};
export default SaleMember;

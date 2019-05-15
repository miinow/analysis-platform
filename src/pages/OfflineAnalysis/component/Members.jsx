import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BasicPie, StackBar } from '../../../components';
import _ from 'lodash';

class Members extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            !_.isEqual(nextProps.member, this.props.member) || !_.isEqual(nextProps.cat2Member, this.props.cat2Member)
        );
    }
    handleData = (data, res) => {
        const memberData = [];
        data &&
            data.length > 0 &&
            data.map(item => {
                const { key, val, ratio } = item;
                memberData.push({
                    value: val,
                    name: key,
                    ratio
                });
            });
        const cat2Data = JSON.parse(JSON.stringify(res).replace(/cat2name/g, 'cat_name'));
        const { xData, barData } = this.catData(cat2Data);

        return { memberData, xData, barData };
    };
    // 二级 三级品类销售数据处理
    catData = res => {
        let xData = [];
        let barData = [];
        xData = Object.keys(res || []);
        const t = [];
        xData.length > 0 &&
            xData.forEach(item => {
                res[item] &&
                    res[item] instanceof Array &&
                    res[item].forEach(key => {
                        t.push(key);
                    });
            });
        const barData_ = t.reduce((acc, cur) => {
            const hasItem = acc.some(e => {
                const temp = e.cat_name === cur.cat_name;
                if (temp) {
                    e.sale_total_amount && e.sale_total_amount.push(cur.sale_total_amount);
                    e.sale_total_amount_ratio && e.sale_total_amount_ratio.push(cur.sale_total_amount_ratio);
                    e.num && e.num.push(cur.num);
                    e.ratio && e.ratio.push(cur.ratio);
                }
                return temp;
            });
            const create = e => {
                e.sale_total_amount && (e.sale_total_amount = [e.sale_total_amount]);
                e.sale_total_amount_ratio && (e.sale_total_amount_ratio = [e.sale_total_amount_ratio]);
                e.num && (e.num = [e.num]);
                e.ratio && (e.ratio = [e.ratio]);
                return e;
            };
            if (!hasItem) {
                acc.push(create(cur));
            }
            return acc;
        }, []);
        barData = barData_.map(item => {
            const o = {
                name: item.cat_name,
                data: item.sale_total_amount || item.num,
                ratio: item.sale_total_amount_ratio || item.ratio
            };
            return o;
        });
        return { xData, barData };
    };

    render() {
        const { member, cat2Member } = this.props;
        const { memberData, xData, barData } = this.handleData(member, cat2Member);
        return (
            <div className="chart clear">
                <div className="pie half fl">
                    <BasicPie
                        diyClass="singleLine"
                        title="会员量分布"
                        style={{ width: '100%', height: 274 }}
                        center={['50%', '60%']}
                        radius={['30%', '60%']}
                        color={[['#00B2E4', '#64F3F9'], ['#F36C9E', '#E73A72']]}
                        pieData={memberData}
                    />
                </div>
                <div className="half fr" style={{ padding: '20px' }}>
                    <StackBar title="重点二级品类会员分布" yTitle1="会员量/万" xData={xData} barData={barData} />
                </div>
            </div>
        );
    }
}

Members.propTypes = {
    member: PropTypes.any,
    cat2Member: PropTypes.any
};
export default Members;

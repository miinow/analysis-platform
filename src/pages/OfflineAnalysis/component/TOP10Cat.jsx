import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LineBar, StackBar } from '../../../components';
import _ from 'lodash';
import { TOP10XYName } from '../config/config';

class TOP10Cat extends Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps, this.props);
    }
    handleSaleData = data => {
        const xData = Object.keys(data || []);
        const barData = [{ name: '新会员数', data: [], ratio: [] }, { name: '老会员数', data: [], ratio: [] }];
        const lineData = [
            { name: '新会员人均购买件数', data: [], ratio: [] },
            { name: '老会员人均购买件数', data: [], ratio: [] }
        ];
        xData.length > 0 &&
            xData.forEach((item, i) => {
                const cur = data[item];
                barData[0].data.push(cur.new);
                barData[1].data.push(cur.old);
                barData[0].ratio.push(cur.newratio);
                barData[1].ratio.push(cur.oldratio);

                lineData[0].data.push(cur.newavg);
                lineData[0].ratio.push(cur.newavgratio);
                lineData[1].data.push(cur.oldavg);
                lineData[1].ratio.push(cur.oldavgratio);
            });

        return {
            xData,
            barData,
            lineData
        };
    };
    catData = res => {
        const stackXData = Object.keys(res || []);
        const t = [];
        stackXData.length > 0 &&
            stackXData.forEach(item => {
                res[item].forEach(key => {
                    t.push(key);
                });
            });
        const barData_ = t.reduce((acc, cur) => {
            const hasItem = acc.some(e => {
                const temp = e.cat3name === cur.cat3name;
                if (temp) {
                    e.num && e.num.push(cur.num);
                    e.ratio && e.ratio.push(cur.ratio);
                }
                return temp;
            });
            const create = e => {
                e.num && (e.num = [e.num]);
                e.ratio && (e.ratio = [e.ratio]);
                return e;
            };
            if (!hasItem) {
                acc.push(create(cur));
            }
            return acc;
        }, []);
        const stackBarData = barData_.map(item => {
            const o = {
                name: item.cat3name,
                data: item.num,
                ratio: item.ratio
            };
            return o;
        });
        return { stackXData, stackBarData };
    };
    render() {
        const { type, data, top6Cat, title } = this.props;
        const { barData, lineData, xData } = this.handleSaleData(data);
        const { stackXData, stackBarData } = this.catData(top6Cat);
        return (
            <div className="pac20">
                {type ? (
                    <LineBar
                        title="TOP10品类购买会员数及人均购买件数"
                        barData={barData}
                        lineData={lineData}
                        xData={xData}
                        yTitle1={TOP10XYName.yTitle1}
                        yTitle2={TOP10XYName.yTitle2}
                    />
                ) : (
                    <StackBar title={title} yTitle1="会员量/万" xData={stackXData} barData={stackBarData} />
                )}
            </div>
        );
    }
}
TOP10Cat.propTypes = {
    data: PropTypes.any, // 是否选择大区 展示 top10 top6
    top6Cat: PropTypes.any,
    type: PropTypes.string,
    title: PropTypes.string
};
export default TOP10Cat;

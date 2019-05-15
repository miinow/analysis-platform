import React, { Component } from 'react';
import { StackBar, LineBar, TableList, SvgIcon } from '../../components';
import { getData } from '../../api/axiosApi';
import { OfflineSalesColumns, CitySalesColumns, RegionColumns, DifferentBuyFrequency } from './tableConfig';

const rat = {
    0: '同比',
    1: '环比',
    2: '对比'
};

export default class StackBarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offlineSales: [],
            citySales: [],
            regionSales: [],
            buyFrequency: [],
            compareType: 0,
            time: {
                current_value: '当前',
                compare_value: '对比区间',
                ratio: ''
            },
            // 二级品类销售
            cat2Sales: {
                cat2X: [],
                cat2Data: []
            },
            // 不选大区
            cat34Region: {
                cat34X: [],
                cat34Data: []
            },
            // 选择大区
            cat34WithRegion: {
                lineData: [],
                barData: [],
                xData: [],
                yTitle1: '订单量/万',
                yTitle2: '销售额/万'
            },
            // 各大区购买会员量
            purchaseMember: {
                memberX: [],
                memberData: []
            },
            // 二级品类会员分布
            cat2Member: {
                cat2MemberX: [],
                cat2MemberData: []
            }
        };
    }
    componentDidMount() {
        this.getOfflineSales();
        this.getCitySales();
        this.getRegionSales();
        this.getDifferentBuyFrequency();
        this.getCat2Sales();
        this.getWithoutRegion();
        this.getWithRegion();
        this.getPurchaseMember();
        this.getCatmember();
        this.getRatio();
    }
    getRatio = () => {
        const ratio = rat[this.state.compareType];
        this.setState({ time: { ...this.state.time, ratio } });
    };
    // 整体情况--线下整体销售情况
    getOfflineSales = () => {
        getData('api/overview/offline_sales')
            .then(res => {
                const temp = [];
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
                temp.forEach(item => {
                    data.forEach((k, i) => {
                        if (k.key === item.key) {
                            obj[item.key] = Object.assign(k, item);
                        }
                    });
                });
                const result = Object.values(obj);
                const result_ = result.map(item => {
                    item.time = this.state.time[item.time];
                    return item;
                });
                this.setState({ offlineSales: result_ });
            })
            .catch(err => {
                console.log(err);
            });
    };
    // 整体情况--不同城市等级的销售情况
    getCitySales = () => {
        getData('/api/overview/city_sales_level')
            .then(res => {
                const citySales = res.map((item, i) => ({ key: i, ...item }));
                this.setState({ citySales });
            })
            .catch(err => {
                console.log(err);
            });
    };
    // 各大区销售分布
    getRegionSales = () => {
        getData('/service-mercury/salesAnalysis/overview/salesAnalysis/regionDistribution')
            .then(res => {
                const regionSales = res.map((item, i) => ({ key: i, ...item }));
                this.setState({ regionSales });
            })
            .catch(err => {
                console.log(err);
            });
    };
    // 不同购买频次的会员量分布
    getDifferentBuyFrequency = () => {
        getData('/service-mercury/memberanalysis/selectdifferentbuyfrequency')
            .then(res => {
                const buyFrequency = res.map((item, i) => ({ key: i, ...item }));
                this.setState({ buyFrequency });
            })
            .catch(err => {
                console.log(err);
            });
    };
    // 各大区重点二级品类销售
    getCat2Sales = () => {
        getData('/service-mercury/salesAnalysis/keyCat2SalesDistribution')
            .then(res => {
                const { xData, barData } = this.catData(res);
                this.setState({ cat2Sales: { cat2X: xData, cat2Data: barData } });
            })
            .catch(err => {
                console.log(err);
            });
    };
    // 各大区top6重点三四级品类（不选大区）
    getWithoutRegion = () => {
        getData('/service-mercury/salesAnalysis/cat34WithoutRegion')
            .then(res => {
                const { xData, barData } = this.catData(res);
                this.setState({ cat34Region: { cat34X: xData, cat34Data: barData } });
            })
            .catch(err => {
                console.log(err);
            });
    };
    // 各大区top6重点三四级品类（选择大区）
    getWithRegion = () => {
        getData('/service-mercury/salesAnalysis/cat34WithRegion')
            .then(res => {
                const xData = [];
                const lineData_ = { name: '销售额', data: [], ratio: [] };
                const barData_ = { name: '订单量', data: [], ratio: [] };
                res.length > 0 &&
                    res.forEach(item => {
                        xData.push(item.cat_name);
                        lineData_.data.push(item.sale_total_amount);
                        lineData_.ratio.push(item.sale_total_amount_ratio);
                        barData_.data.push(item.order_cnt);
                        barData_.ratio.push(item.order_cnt_ratio);
                    });
                const barData = [barData_];
                const lineData = [lineData_];
                this.setState({ cat34WithRegion: { ...this.state.cat34WithRegion, xData, barData, lineData } });
            })
            .catch(err => {
                console.log(err);
            });
    };
    // 各大区购买会员量
    getPurchaseMember = () => {
        getData('/service-mercury/memberanalysis/selectdistrictmember')
            .then(res => {
                const memberX = [];
                const new_ = { name: '新会员', data: [], ratio: [] };
                const old = { name: '老会员', data: [], ratio: [] };
                res.length > 0 &&
                    res.forEach(item => {
                        memberX.push(item.region_name);
                        new_.data.push(item.new);
                        new_.ratio.push(item.newratio);
                        old.data.push(item.old);
                        old.ratio.push(item.oldratio);
                    });
                const memberData = [new_, old];
                this.setState({ purchaseMember: { memberX, memberData } });
            })
            .catch(err => {
                console.log(err);
            });
    };
    // 重点二级品类会员分布
    getCatmember = () => {
        getData('/service-mercury/memberanalysis/secondcategorymember')
            .then(res => {
                const data = JSON.parse(JSON.stringify(res).replace(/cat2name/g, 'cat_name'));
                const { xData, barData } = this.catData(data);
                this.setState({ cat2Member: { cat2MemberX: xData, cat2MemberData: barData } });
            })
            .catch(err => {
                console.log(err);
            });
    };
    // 二级 三级品类销售数据处理
    catData = res => {
        const xData = Object.keys(res);
        const t = [];
        Object.keys(res).forEach(item => {
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
        const barData = barData_.map(item => {
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
        const {
            offlineSales,
            citySales,
            compareType,
            regionSales,
            buyFrequency,
            cat2Sales,
            cat34Region,
            cat34WithRegion,
            purchaseMember,
            cat2Member
        } = this.state;
        const { cat2X, cat2Data } = cat2Sales;
        const { cat34X, cat34Data } = cat34Region;
        const { memberX, memberData } = purchaseMember;
        const { xData, lineData, barData, yTitle1, yTitle2 } = cat34WithRegion;
        const { cat2MemberX, cat2MemberData } = cat2Member;
        return (
            <div>
                <StackBar title="各大区重点二级品类销售" yTitle1="销售额/万" xData={cat2X} barData={cat2Data} />
                <StackBar title="各大区TOP6重点三级品类" yTitle1="销售额/万" xData={cat34X} barData={cat34Data} />
                <LineBar
                    title="三级品类TOP10的销售额分布"
                    barData={barData}
                    lineData={lineData}
                    xData={xData}
                    yTitle1={yTitle1}
                    yTitle2={yTitle2}
                    titlePos="left"
                />
                <StackBar title="各大区购买会员量" yTitle1="单位: 万" xData={memberX} barData={memberData} />
                <StackBar
                    title="重点二级品类会员分布"
                    yTitle1="销售额/万"
                    xData={cat2MemberX}
                    barData={cat2MemberData}
                />

                <TableList tableDataSource={offlineSales} columns={OfflineSalesColumns} tableTitle="线下整体销售情况" />
                <TableList
                    tableDataSource={citySales}
                    columns={CitySalesColumns(rat[compareType])}
                    tableTitle="不同城市等级的销售情况"
                />
                <TableList
                    tableDataSource={regionSales}
                    columns={RegionColumns(rat[compareType])}
                    tableTitle="大区整体销售"
                />
                <TableList
                    tableDataSource={buyFrequency}
                    columns={DifferentBuyFrequency}
                    tableTitle="不同购买频次的会员量分布"
                />
            </div>
        );
    }
}

import React, { Component } from 'react';
import { BasicLine, BasicPie } from '../../components';
import { getData } from '../../api/axiosApi';
import { Divider } from 'antd';

class CategotyPie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catSales: [],
            cat1Sales: [],
            memberData: [],
            buyFrequency: []
        };
    }

    componentWillMount() {
        this.getPieData();
    }

    getPieData = () => {
        const params = {
            channel: "10",
            compareType: "",
            startDate: "2019-02-01",
            endDate: "2019-02-13",
            compareStartDate: "2019-02-01",
            compareEndDate: "2019-02-13",
            showType: 0,
        };
        // 销售额分布
        getData('/service-mercury/salesAnalysis/cat1SalseDistribution', params)
            .then(res => {
                this.handleCatData(res);
            })
            .catch(err => {
                console.log(err);
            });
        // 一级品类销售分布
        getData('/service-mercury/salesAnalysis/cat1SalseDistribution2', params)
            .then(res => {
                this.handleCat1Data(res);
            })
            .catch(err => {
                console.log(err);
            });
        // 会员量分布
        getData('/service-mercury/memberanalysis/memberdistribution', params)
            .then(res => {
                this.handleMemberData(res);
            })
            .catch(err => {
                console.log(err);
            });
        // 会员的购买频次分布
        getData('/service-mercury/memberanalysis/selectmemberbuyfrequency', params)
        .then(res => {
            this.handleBuyFrequency(res);
        })
        .catch(err => {
            console.log(err);
        });
    }
    handleCatData = data => {
        const catSales = [];
        data.length > 0 &&
            data.map(item => {
                const { sale_total_amount, off_cat_name1, sale_total_amount_ratio } = item;
                catSales.push({
                    value: sale_total_amount,
                    name: off_cat_name1,
                    ratio: sale_total_amount_ratio
                });
            });
        this.setState({
            catSales
        });
    };
    handleCat1Data = data => {
        const cat1Sales = [];
        data.length > 0 &&
            data.map(item => {
                const { sale_total_amount, off_cat_name1, sale_total_amount_ratio } = item;
                cat1Sales.push({
                    value: sale_total_amount,
                    name: off_cat_name1,
                    ratio: sale_total_amount_ratio
                });
            });
        this.setState({
            cat1Sales
        });
    };

    handleMemberData = data => {
        const memberData = [];
        data.length > 0 &&
            data.map(item => {
                const { key, val, ratio } = item;
                memberData.push({
                    value: val,
                    name: key,
                    ratio
                });
            });
        this.setState({
            memberData
        });
    }

    handleBuyFrequency = data => {
        const buyFrequency = [];
        data.length > 0 &&
            data.map(item => {
                const { name, val, ratio } = item;
                buyFrequency.push({
                    value: val,
                    name,
                    ratio
                });
            });
        this.setState({
            buyFrequency
        });
    }

    render() {
        const { catSales, cat1Sales, memberData, buyFrequency } = this.state;

        return (
            <div>
                {/* 销售额分布 */}
                <BasicPie
                    diyClass="singleLine"
                    type="rose"
                    title="销售额分布"
                    style={{ width: '50%', height: 274 }}
                    center={['50%', '60%']}
                    radius={['20%', '60%']}
                    color={[['#9C5DFD', '#0B74F6'], ['#FE4978 ', '#F66035']]}
                    pieData={catSales}
                />
                {/* 一级品类销售分布 */}
                <BasicPie
                    diyClass="singleLine"
                    type="rose"
                    title="一级品类销售分布"
                    style={{ width: '50%', height: 274 }}
                    center={['50%', '60%']}
                    radius={['20%', '60%']}
                    color={[
                        ['#00B2E4', '#64F3F9'],
                        ['#F6EB54 ', '#F5AF61'],
                        ['#A03DF4', '#BF70F5'],
                        ['#F36C9E', '#E73A72']
                    ]}
                    pieData={cat1Sales}
                />
                {/* 会员量分布 */}
                <BasicPie
                    diyClass="singleLine"
                    title="会员量分布"
                    style={{ width: '50%', height: 274 }}
                    center={['50%', '60%']}
                    radius={['30%', '60%']}
                    color={[['#00B2E4', '#64F3F9'], ['#F36C9E', '#E73A72']]}
                    pieData={memberData}
                />
                {/* 会员的购买频次分步 */}
                <BasicPie
                    diyClass="singleLine"
                    title="会员的购买频次分步"
                    style={{ width: '50%', height: 274 }}
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
        );
    }
}

export default CategotyPie;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MapChart, TableList } from '../../../../components';
import { CitySalesColumns } from '../../config/tableConfig';
import _ from 'lodash';

class CitySale extends Component {
    handleData = (chartData, tableData) => {
        const citySales = this.getCitySales(tableData);
        const mapData = {
            dataOrder: [],
            dataSale: [],
            city: {}
        };
        let name;
        if (chartData instanceof Array && chartData.length > 0) {
            chartData.map(item => {
                const order = [];
                const sale = [];
                name = item.state_name.indexOf('省') > -1 ? item.state_name.replace('省', '') : item.state_name;
                const top = item.top5;
                mapData.dataOrder.push({
                    name,
                    value: item.order_cnt
                });
                mapData.dataSale.push({
                    name,
                    value: item.sale_total_amount
                });
                top.length > 0 &&
                    top.map(cur => {
                        order.push({
                            name: cur.city_name,
                            value: `${cur.order_cnt}万`,
                            quota: cur.amout_ratio
                        });
                    });
                const newTop5 = _.cloneDeep(top);
                newTop5.sort((a, b) => b.sale_amount - a.sale_amount);
                newTop5.length > 0 &&
                    newTop5.map(data => {
                        sale.push({
                            name: data.city_name,
                            value: `${data.sale_amount}万`,
                            quota: data.order_ratio
                        });
                    });
                mapData.city[name] = {
                    order,
                    sale
                };
            });
        }
        return { mapData, citySales };
    };
    shouldComponentUpdate(nextProps) {
        return (
            !_.isEqual(nextProps.cityMapData, this.props.cityMapData) ||
            !_.isEqual(nextProps.cityTableData, this.props.cityTableData)
        );
    }
    getCitySales = res => {
        return res instanceof Array && res.length > 0 ? res.map((item, i) => ({ key: i, ...item })) : [];
    };
    render() {
        const { cityMapData, cityTableData, unit } = this.props;
        const { mapData, citySales } = this.handleData(cityMapData, cityTableData);
        return (
            <div className="city group">
                <h3 className="h4">各城市销售分布（点击图例，地图中数据切换为相关图例数据）</h3>
                <div className="module">
                    <MapChart mapData={mapData} />
                </div>
                <div className="module table">
                    <TableList
                        tableDataSource={citySales}
                        columns={CitySalesColumns(unit)}
                        tableTitle="不同城市等级的销售情况"
                    />
                </div>
            </div>
        );
    }
}

CitySale.propTypes = {
    unit: PropTypes.string,
    cityMapData: PropTypes.any,
    cityTableData: PropTypes.any
};
export default CitySale;

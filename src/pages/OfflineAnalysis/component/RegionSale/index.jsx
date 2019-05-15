import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TableList, BasicPie } from '../../../../components';
import { RegionColumns } from '../../config/tableConfig';
import _ from 'lodash';
import { pie12Color } from '../../config/config';

class RegionSale extends Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.regionSales, this.props.regionSales);
    }
    handleSaleData = allData => {
        // regionSales 大区整体销售/占比
        const salesTableData = [];
        const salesPieData = [];
        allData.length > 0 &&
            allData.map((item, i) => {
                salesTableData.push({ key: i, ...item });
                salesPieData.push({
                    value: item.sale_total_amount,
                    ratio: item.sale_total_amount_ratio,
                    name: item.region_name
                });
            });

        return {
            salesTableData,
            salesPieData
        };
    };
    render() {
        const { regionSales, unit } = this.props;
        const { salesTableData, salesPieData } = this.handleSaleData(regionSales);
        return (
            <div>
                <TableList tableDataSource={salesTableData} columns={RegionColumns(unit)} tableTitle="大区整体销售" />
                <BasicPie
                    diyClass="region"
                    type="area"
                    tooltip
                    title="各大区销售额占比"
                    style={{ width: '100%', height: 274 }}
                    center={['50%', '60%']}
                    radius={['20%', '60%']}
                    color={pie12Color}
                    pieData={salesPieData}
                />
            </div>
        );
    }
}

RegionSale.propTypes = {
    unit: PropTypes.string,
    regionSales: PropTypes.any
};
export default RegionSale;

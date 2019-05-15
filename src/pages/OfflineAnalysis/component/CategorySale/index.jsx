import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BasicPie } from '../../../../components';
import _ from 'lodash';
import { pitCateColor, pieCate1Color } from '../../config/config';

class CategorySale extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            !_.isEqual(nextProps.catSales, this.props.catSales) || !_.isEqual(nextProps.cat1Sales, this.props.cat1Sales)
        );
    }
    handleCatData = data => {
        const catSalesData = [];
        data.length > 0 &&
            data.map(item => {
                const { sale_total_amount, off_cat_name1, sale_total_amount_ratio } = item;
                catSalesData.push({
                    value: sale_total_amount,
                    name: off_cat_name1,
                    ratio: sale_total_amount_ratio
                });
            });
        return { catSalesData };
    };
    handleCat1Data = data => {
        const cat1SalesData = [];
        data.length > 0 &&
            data.map(item => {
                const { sale_total_amount, off_cat_name1, sale_total_amount_ratio } = item;
                cat1SalesData.push({
                    value: sale_total_amount,
                    name: off_cat_name1,
                    ratio: sale_total_amount_ratio
                });
            });
        return { cat1SalesData };
    };
    render() {
        const { catSales, cat1Sales } = this.props;
        const { catSalesData } = this.handleCatData(catSales);
        const { cat1SalesData } = this.handleCat1Data(cat1Sales);
        return (
            <div className="cate-chart clear">
                <BasicPie
                    diyClass="half sale fl"
                    type="rose"
                    title="销售额分布"
                    style={{ width: '100%', height: 274 }}
                    center={['50%', '60%']}
                    radius={['20%', '60%']}
                    color={pitCateColor}
                    pieData={catSalesData}
                />
                <BasicPie
                    diyClass="half fr"
                    type="rose"
                    title="一级品类销售分布"
                    style={{ width: '100%', height: 274 }}
                    center={['50%', '60%']}
                    radius={['20%', '60%']}
                    color={pieCate1Color}
                    pieData={cat1SalesData}
                />
            </div>
        );
    }
}

CategorySale.propTypes = {
    catSales: PropTypes.any,
    cat1Sales: PropTypes.any
};
export default CategorySale;

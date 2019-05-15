import React, { Component } from 'react';
import { HeatMapTable } from '../../../components';
import PropTypes from 'prop-types';

class HeatMap extends Component {
    handleRawData = data => {
        const columns = [{ title: '大区', dataIndex: 'region_name', key: 'region_name' }];
        const keys = [];
        data.title &&
            data.title.length > 0 &&
            data.title.forEach((item, index) => {
                columns.push({
                    title: item,
                    dataIndex: `brand_name_${index}`,
                    ratioIndex: `brand_name_${index}_ratio`,
                    key: `brand_name_${index}`
                });
                keys.push(`brand_name_${index}`);
            });
        const nums = [];
        data.list &&
            data.list.length > 0 &&
            data.list.forEach(item => {
                keys.forEach(key => {
                    nums.push(+item[key]);
                });
            });
        const max = Math.max(...nums),
            min = Math.min(...nums);

        return {
            columns,
            max,
            min,
            data: data.list
        };
    };

    render() {
        const { heatMapData, unit } = this.props;
        const { columns, max, min, data } = this.handleRawData(heatMapData);

        return <HeatMapTable compareType={unit} columns={columns} data={data} max={+max} min={+min} />;
    }
}
HeatMap.propTypes = {
    heatMapData: PropTypes.any,
    unit: PropTypes.string
};
export default HeatMap;

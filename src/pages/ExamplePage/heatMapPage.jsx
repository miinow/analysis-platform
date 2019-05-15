import React, { Component } from 'react';
import { HeatMapTable } from '../../components';
import { getData } from '../../api/axiosApi';

class HeatMapPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            data: [],
            max: 10,
            min: 0
        };
    }

    componentWillMount() {
        this.getHeatMapData();
    }

    getHeatMapData = async () => {
        try {
            const res = await getData('/api/salesAnalysis/cat34Top6', {
                channel: '',
                compareType: '',
                startDate: '',
                endDate: '',
                compareStartDate: '',
                compareEndDate: '',
                regionName: '',
                off_cat_name1: '',
                off_cat_name2: '',
                off_cat_name3: ''
            });
            this.handleRawData(res);
        } catch (err) {
            console.log('error', err);
        }
    };

    handleRawData = data => {
        const columns = [{ title: '大区', dataIndex: 'region_name', key: 'region_name' }];
        const keys = [];
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
        data.list.forEach(item => {
            keys.forEach(key => {
                nums.push(+item[key]);
            });
        });
        const max = Math.max(...nums),
            min = Math.min(...nums);
        this.setState({
            columns,
            max,
            min,
            data: data.list
        });
    };

    render() {
        const { columns, max, min, data } = this.state;

        return (
            <div style={{ margin: '0 20px' }}>
                <HeatMapTable columns={columns} data={data} max={+max} min={+min} />
                <HeatMapTable />
                <HeatMapTable />
                <HeatMapTable />
            </div>
        );
    }
}

export default HeatMapPage;

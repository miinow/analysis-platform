import React, { Component } from 'react';
import { BasicLine } from '../../components';
import { getData } from '../../api/axiosApi';

class SingleLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineData: [],
            lineXData: []
        };
    }

    componentWillMount() {
        this.getLineData();
    }

    getLineData = () => {
        const params = {
            channel: "10",
            startDate: "2019-02-01",
            endDate: "2019-02-13",
            compareStartDate: "2019-02-01",
            compareEndDate: "2019-02-13"
        };
        getData('/service-mercury/memberanalysis/selecttop20cat3member', params)
        .then(res => {
            this.handleLineData(res);
        })
        .catch(err => {
            console.log(err);
        });
    }
    handleLineData = data => {
        const lineData = [],
            lineXData = [];
            data && data.length > 0 && data.forEach(element => {
                const { cat3name, bf } = element;
                lineXData.push(cat3name);
                lineData.push(bf);
            });
        this.setState({
            lineData: [lineData],
            lineXData,
        });
    };

    render() {
        const { lineData, lineXData } = this.state;

        return (
            <BasicLine
                diyClass="singleLine"
                title="购买频次TOP20的三级品类分部"
                style={{ width: '100%', height: 274 }}
                lineData={lineData}
                lineXData={lineXData}
                unit="购买频次"
            />
        );
    }
}

export default SingleLine;

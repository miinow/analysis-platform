import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BasicLine } from '../../../components';
import _ from 'lodash';

class T20Cate3 extends Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.data, this.props.data);
    }
    handleData = data => {
        const lineData = [],
            lineXData = [];
        data &&
            data.length > 0 &&
            data.forEach(element => {
                const { cat3name, bf } = element;
                lineXData.push(cat3name);
                lineData.push(bf);
            });
        return {
            lineData: [lineData],
            lineXData
        };
    };

    render() {
        const { data } = this.props;
        const { lineData, lineXData } = this.handleData(data);
        return (
            <BasicLine
                diyClass="top20"
                title="购买频次TOP20的三级品类分部"
                style={{ width: '100%', height: 274 }}
                lineData={lineData}
                lineXData={lineXData}
                unit="购买频次"
            />
        );
    }
}

T20Cate3.propTypes = {
    data: PropTypes.any
};
export default T20Cate3;

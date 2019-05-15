import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StackBar } from '../../../components';
import _ from 'lodash';

class RegionMember extends Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.data, this.props.data);
    }
    handleSaleData = res => {
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
        return { memberX, memberData };
    };
    render() {
        const { data } = this.props;
        const { memberX, memberData } = this.handleSaleData(data);
        return <StackBar title="各大区购买会员量" xData={memberX} barData={memberData} />;
    }
}

RegionMember.propTypes = {
    data: PropTypes.any
};
export default RegionMember;

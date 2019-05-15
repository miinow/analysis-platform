import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isUpOrDown, toThousands, fontType } from '../../../../utils/utils';
import _ from 'lodash';

class SaleFont extends Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.saleFont, this.props.saleFont);
    }
    handleData = saleFont => {
        let type1 = '';
        let type2 = '';
        if (saleFont && saleFont.length > 0) {
            if (+saleFont[1] === 0) {
                saleFont[1] = '持平';
            } else if (isUpOrDown(saleFont[1]).flag === 1) {
                saleFont[1] = `增长${isUpOrDown(saleFont[1]).value}`;
            } else if (isUpOrDown(saleFont[1]).flag === 2) {
                saleFont[1] = `下降${isUpOrDown(saleFont[1]).value}`;
            } else if (isUpOrDown(saleFont[1]).flag === 0) {
                saleFont[1] = `${isUpOrDown(saleFont[1]).value}`;
            }
            saleFont[2] = toThousands(saleFont[2]);
            type1 = fontType(saleFont[4]).type;
            saleFont[4] = toThousands(parseFloat(fontType(saleFont[4]).value));
            if (+saleFont[5] === 0) {
                saleFont[5] = '持平';
            } else if (isUpOrDown(saleFont[5]).flag === 1) {
                saleFont[5] = `增长${isUpOrDown(saleFont[5]).value}`;
            } else if (isUpOrDown(saleFont[5]).flag === 2) {
                saleFont[5] = `下降${isUpOrDown(saleFont[5]).value}`;
            } else if (isUpOrDown(saleFont[5]).flag === 2) {
                saleFont[5] = `${isUpOrDown(saleFont[5]).value}`;
            }

            type2 = fontType(saleFont[11]).type;
            saleFont[11] = toThousands(parseFloat(fontType(saleFont[11]).value));
            if (+saleFont[12] === 0) {
                saleFont[12] = '持平';
            } else if (isUpOrDown(saleFont[12]).flag === 1) {
                saleFont[12] = `增长${isUpOrDown(saleFont[12]).value}`;
            } else if (isUpOrDown(saleFont[12]).flag === 2) {
                saleFont[12] = `下降${isUpOrDown(saleFont[12]).value}`;
            } else if (isUpOrDown(saleFont[12]).flag === 2) {
                saleFont[12] = `${isUpOrDown(saleFont[12]).value}`;
            }
            saleFont[14] = toThousands(parseFloat(fontType(saleFont[14]).value));
        }
        return {
            info: saleFont || [],
            type1,
            type2
        };
    };

    render() {
        const { saleFont, unit } = this.props;
        const { info, type1, type2 } = this.handleData(saleFont);
        return (
            <div className="font-info">
                <div className="name">
                    销售额主要集中在{info[0] ? info[0] : ''}，其销售额{unit}
                    <span>{info[1] ? info[1] : ''}</span>，购买会员数<span>{info[2] ? info[2] : ''}</span>万；
                </div>
                <ul>
                    <li>
                        • {info[3] ? info[3] : ''}大区销售额{type1}较多，
                        <span>
                            {type1}
                            {info[4] ? info[4] : ''}
                        </span>
                        元，{unit}
                        <span>{info[5] ? info[5] : ''}</span>， 其{info[6] ? info[6] : ''}-{info[7] ? info[7] : ''}-
                        {info[8] ? info[8] : ''}销售{type1}明显；
                    </li>
                    <li>
                        • 从品类看，{info[9] ? info[9] : ''}
                        {info[10] ? info[10] : ''}
                        {type2}明显，
                        <span>
                            {type2}
                            {info[11] ? info[11] : ''}
                        </span>
                        元，{unit}
                        <span>{info[12] ? info[12] : ''}</span>，主要是{info[13] ? info[13] : ''}
                        <span>
                            {type2}
                            {info[14] ? info[14] : ''}
                        </span>
                        元所致；
                    </li>
                </ul>
            </div>
        );
    }
}

SaleFont.propTypes = {
    saleFont: PropTypes.any,
    unit: PropTypes.string
};
export default SaleFont;

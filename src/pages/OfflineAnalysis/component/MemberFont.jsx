import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isUpOrDown, toThousands, fontType } from '../../../utils/utils';
import _ from 'lodash';

class MemberFont extends Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.fontData, this.props.fontData);
    }

    render() {
        const { type, unit, fontData } = this.props;
        const info = fontData || [];
        return (
            <div className="font-info">
                {info.length > 0 ? (
                    <div>
                        <div className="name">
                            购买会员共<span>{toThousands(info[0].all)}</span>万,其中新会员占
                            <span>{toThousands(info[0].new)}</span>万;
                        </div>
                        <ul>
                            <li>
                                • 从大区来看，{info[1].region}购买会员数{info[1].type ? '上升' : '下降'}较多，
                                <span>
                                    {info[1].type ? '上升' : '下降'}
                                    {info[1].desc}
                                </span>
                                个，
                                {unit}
                                <span>
                                    {info[1].type ? '上升' : '下降'}
                                    {info[1].ratio}
                                </span>
                                ；
                            </li>
                            <li>
                                • 从品类看，{info[2].region}
                                {info[2].cat2name}购买会员数{info[2].type ? '上升' : '下降'}明显，
                                <span>
                                    {info[2].type ? '上升' : '下降'}
                                    {info[2].desc}
                                </span>
                                个，{unit}
                                <span>
                                    {info[2].type ? '上升' : '下降'}
                                    {info[2].ratio}
                                </span>
                                ，主要由于{type}
                                {info[2].type ? '上升' : '下降'}明显导致；；
                            </li>
                            <li>{info[3].cat3 ? info[3].cat3.join('，') : ''}的会员购买频次较高。</li>
                        </ul>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

MemberFont.propTypes = {
    type: PropTypes.string,
    unit: PropTypes.string,
    fontData: PropTypes.any
};
export default MemberFont;

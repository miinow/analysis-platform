import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createDom } from '../../utils/utils';
import Error from '../Error';

import './HeatMapTable.scss';

import down from '../../assets/image/down.png';
import up from '../../assets/image/up.png';

const defaultColumns = [
    { title: '大区', dataIndex: 'region_name', key: 'region_name' },
    { title: 'Apple', dataIndex: 'first', key: 'first' },
    { title: '九阳', dataIndex: 'second', key: 'second' },
    { title: 'TCL', dataIndex: 'third', key: 'third' },
    { title: 'VIVO', dataIndex: 'forth', key: 'forth' },
    { title: '三洋', dataIndex: 'fifth', key: 'fifth' },
    { title: '万和', dataIndex: 'sixth', key: 'sixth' },
    { title: '万家乐', dataIndex: 'seventh', key: 'seventh' },
    { title: 'A.O史密斯', dataIndex: 'eighth', key: 'eighth' },
    { title: '伊莱克斯', dataIndex: 'ninth', key: 'ninth' },
    { title: '三星', dataIndex: 'tenth', key: 'tenth' }
];

const defaultData = [
    {
        region_name: '华北一区',
        first: 8.1,
        second: 6.3,
        third: 13.5,
        forth: 11.0,
        fifth: 7.9,
        sixth: 10.8,
        seventh: 10.1,
        eighth: 10.8,
        ninth: 10.1,
        tenth: 10.1
    },
    {
        region_name: '华东一区',
        first: 5.1,
        second: 4.3,
        third: 13.5,
        forth: 11.0,
        fifth: 7.9,
        sixth: 10.8,
        seventh: 10.1,
        eighth: 10.8,
        ninth: 10.1,
        tenth: 10.1
    },
    {
        region_name: '华南大区',
        first: 1.1,
        second: 4.3,
        third: 13.5,
        forth: 11.0,
        fifth: 7.9,
        sixth: 10.8,
        seventh: 10.1,
        eighth: 10.8,
        ninth: 10.1,
        tenth: 10.1
    },
    {
        region_name: '华北二区',
        first: 2.1,
        second: 4.3,
        third: 13.5,
        forth: 11.0,
        fifth: 7.9,
        sixth: 10.8,
        seventh: 10.1,
        eighth: 10.8,
        ninth: 10.1,
        tenth: 10.1
    },
    {
        region_name: '西南大区',
        first: 2.1,
        second: 4.3,
        third: 13.5,
        forth: 11.0,
        fifth: 7.9,
        sixth: 10.8,
        seventh: 10.1,
        eighth: 10.8,
        ninth: 10.1,
        tenth: 10.1
    },
    {
        region_name: '西北大区',
        first: 2.1,
        second: 4.3,
        third: 13.5,
        forth: 11.0,
        fifth: 7.9,
        sixth: 10.8,
        seventh: 10.1,
        eighth: 10.8,
        ninth: 10.1,
        tenth: 10.1
    },
    {
        region_name: '东北大区',
        first: 2.1,
        second: 4.3,
        third: 13.5,
        forth: 11.0,
        fifth: 7.9,
        sixth: 10.8,
        seventh: 10.1,
        eighth: 10.8,
        ninth: 10.1,
        tenth: 10.1
    },
    {
        region_name: '华中大区',
        first: 2.1,
        second: 4.3,
        third: 13.5,
        forth: 11.0,
        fifth: 7.9,
        sixth: 10.8,
        seventh: 10.1,
        eighth: 10.8,
        ninth: 10.1,
        tenth: 10.1
    },
    {
        region_name: '河南大区',
        first: 2.1,
        second: 4.3,
        third: 13.5,
        forth: 11.0,
        fifth: 7.9,
        sixth: 10.8,
        seventh: 10.1,
        eighth: 10.8,
        ninth: 10.1,
        tenth: 10.1
    },
    {
        region_name: '华东二区',
        first: 2.1,
        second: 4.3,
        third: 13.5,
        forth: 11.0,
        fifth: 7.9,
        sixth: 10.8,
        seventh: 10.1,
        eighth: 10.8,
        ninth: 10.1,
        tenth: 10.1
    },
    {
        region_name: '福建大区',
        first: 2.1,
        second: 4.3,
        third: 13.5,
        forth: 11.0,
        fifth: 7.9,
        sixth: 10.8,
        seventh: 10.1,
        eighth: 10.8,
        ninth: 10.1,
        tenth: 10.1
    },
    {
        region_name: '广西大区',
        first: 0.6,
        second: 4.3,
        third: 13.5,
        forth: 11.0,
        fifth: 7.9,
        sixth: 10.8,
        seventh: 10.1,
        eighth: 10.8,
        ninth: 10.1,
        tenth: 10.1
    }
];

class GradientCreator {
    constructor(colors, vals = [0, 10]) {
        this.vals = vals;
        this.rgbs = [];
        colors.forEach(color => {
            this.rgbs.push(this.colorRgb(color));
        });
        const stepCounts = colors.length - 1;
        const stepVal = (vals[1] - vals[0]) / stepCounts;
        this.stepVal = stepVal;
        this.stepVals = [];
        this.stepRs = [];
        this.stepGs = [];
        this.stepBs = [];
        for (let i = 0; i < stepCounts; i++) {
            const sRGB = this.rgbs[i];
            const eRGB = this.rgbs[i + 1];
            this.stepVals.push(vals[0] + stepVal * i);
            this.stepRs.push((eRGB[0] - sRGB[0]) / stepVal);
            this.stepGs.push((eRGB[1] - sRGB[1]) / stepVal);
            this.stepBs.push((eRGB[2] - sRGB[2]) / stepVal);
        }
    }

    getColor = val => {
        val = val < this.vals[0] ? this.vals[0] : val > this.vals[1] ? this.vals[1] : val;
        let index = this.stepVals.findIndex(num => num > val);
        index = ~index ? index - 1 : this.stepVals.length - 1;
        const realVal = val - this.stepVal * index;
        return this.colorHex(
            'rgb(' +
                parseInt(this.stepRs[index] * realVal + this.rgbs[index][0], 10) +
                ',' +
                parseInt(this.stepGs[index] * realVal + this.rgbs[index][1], 10) +
                ',' +
                parseInt(this.stepBs[index] * realVal + this.rgbs[index][2], 10) +
                ')'
        );
    };

    colorRgb = sColor => {
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        sColor = sColor.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = '#';
                for (let i = 1; i < 4; i++) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            const sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2), 16));
            }
            return sColorChange;
        } else {
            return sColor;
        }
    };

    colorHex = rgb => {
        const _this = rgb;
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (/^(rgb|RGB)/.test(_this)) {
            const aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, '').split(',');
            let strHex = '#';
            for (let i = 0; i < aColor.length; i++) {
                let hex = Number(aColor[i]).toString(16);
                hex = hex < 10 ? 0 + '' + hex : hex;
                if (hex === '0') {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = _this;
            }
            return strHex;
        } else if (reg.test(_this)) {
            const aNum = _this.replace(/#/, '').split('');
            if (aNum.length === 6) {
                return _this;
            } else if (aNum.length === 3) {
                let numHex = '#';
                for (let i = 0; i < aNum.length; i += 1) {
                    numHex += aNum[i] + aNum[i];
                }
                return numHex;
            }
        } else {
            return _this;
        }
    };
}

class HeatMapTable extends Component {
    constructor(props) {
        super(props);
        this.tooltip = '';
    }

    createToolTip = (e, ratio) => {
        e.currentTarget.classList.add('selected-cell');
        const targetInfo = e.currentTarget.getBoundingClientRect();
        const w = targetInfo.width,
            eLeft = targetInfo.left,
            eTop = targetInfo.top,
            tooltipW = 140,
            tooltipH = 60;
        let imgType;
        let numColor;
        ratio = ratio || '+10.127%';
        if (ratio !== '--') {
            imgType = parseFloat(ratio) > 0 ? up : down;
            numColor = parseFloat(ratio) > 0 ? '#4EA902' : '#B42101';
            ratio = Math.abs(parseFloat(ratio));
        }
        const toolTipHtml = `
            <div class="heat-map-tooltip">
                <span>
                    ${this.props.compareType}: ${imgType ? `<img src=${imgType} alt="" />` : ''}
                    <span style=${`color:${numColor}`}>${ratio}%</span>
                <span>
            </div>
        `;
        this.tooltip = createDom(toolTipHtml);
        this.tooltip.css({
            width: `${tooltipW}px`,
            lineHeight: `${tooltipH}px`,
            top: `${eTop - tooltipH - 10}px`,
            left: `${eLeft + w / 2 - tooltipW / 2}px`
        });
        document.body.appendChild(this.tooltip);
    };

    destroyToolTip = e => {
        e.currentTarget.classList.remove('selected-cell');
        this.tooltip.destroy();
    };

    render() {
        const { data, columns, title, min, max } = this.props;
        this.creator = new GradientCreator(['#f8696b', '#FEE783', '#63be7b'], [min, max]);
        return (
            <div className="heat-table-wrapper">
                {title ? <h4>{title}</h4> : ''}
                {data.length ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    {columns.map((item, index) => (
                                        <th key={index}>{item.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        {columns.map(columnItem => (
                                            <td
                                                key={columnItem.key}
                                                style={{
                                                    backgroundColor:
                                                        columnItem.dataIndex !== 'region_name'
                                                            ? this.creator.getColor(item[columnItem.dataIndex])
                                                            : ''
                                                }}
                                                className={columnItem.dataIndex === 'region_name' ? 'first-cells' : ''}
                                                onMouseEnter={e => {
                                                    columnItem.dataIndex !== 'region_name' &&
                                                        this.createToolTip(e, item[columnItem.ratioIndex]);
                                                }}
                                                onMouseLeave={e => {
                                                    columnItem.dataIndex !== 'region_name' && this.destroyToolTip(e);
                                                }}
                                            >
                                                {item[columnItem.dataIndex]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <Error />
                )}
            </div>
        );
    }
}

HeatMapTable.defaultProps = {
    columns: defaultColumns,
    data: [],
    title: 'TOP10重点品牌各大区销售（单位/万）',
    min: 0,
    max: 13,
    compareType: '对比'
};

HeatMapTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    title: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    compareType: PropTypes.string
};

export default HeatMapTable;

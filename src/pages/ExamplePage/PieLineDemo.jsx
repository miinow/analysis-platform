import React, { Component } from 'react';
import { BasicPie, BasicLine } from '../../components';
import SingleLine from './singleLine';
import CategotyPie from './CategotyPie';
import './PieLineDemo.scss';

export default class pieDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 饼图
            channelData: [
                {
                    value: 18148289393,
                    name: '来购',
                    ratio: -0.792
                },
                {
                    value: 41400912412,
                    name: '金力',
                    ratio: -0.543
                }
            ],
            // 12大区
            pieData: [
                {
                    value: '2164.7',
                    ratio: '0.365',
                    name: '华北一区'
                },
                {
                    value: '1281.1',
                    ratio: '-0.360',
                    name: '华东一区'
                },
                {
                    value: '1043.4',
                    ratio: '-0.493',
                    name: '华北二区'
                },
                {
                    value: '917.1',
                    ratio: '-0.439',
                    name: '西北大区'
                },
                {
                    value: '801.4',
                    ratio: '-0.410',
                    name: '华南大区'
                },
                {
                    value: '612.1',
                    ratio: '-0.579',
                    name: '西南大区'
                },
                {
                    value: '496.6',
                    ratio: '-0.458',
                    name: '东北大区'
                },
                {
                    value: '486.7',
                    ratio: '-0.590',
                    name: '华中大区'
                },
                {
                    value: '180.1',
                    ratio: '-0.543',
                    name: '华东二区'
                },
                {
                    value: '169.5',
                    ratio: '-0.611',
                    name: '福建大区'
                },
                {
                    value: '69.5',
                    ratio: '-0.509',
                    name: '广西大区'
                },
                {
                    value: '10.3',
                    ratio: '-0.813',
                    name: '河南大区'
                }
            ]
        };
    }

    render() {
        const {
            pieData,
            channelData
        } = this.state;
        return (
            <div style={{ margin: '0 20px' }} className="piedemo">
                <CategotyPie />
                <SingleLine />
                {/* 饼图 */}
                {/* 线下各渠道销售额占比 */}
                <BasicPie
                    diyClass="singleLine"
                    title="线下各渠道销售额占比"
                    style={{ width: '50%', height: 274 }}
                    center={['50%', '60%']}
                    color={[['#9C5DFD', '#0B74F6'], ['#FE4978 ', '#F66035']]}
                    pieData={channelData}
                />
                {/* 各大区销售额占比 */}
                <BasicPie
                    diyClass="singleLine"
                    type="area"
                    tooltip
                    title="各大区销售额占比"
                    style={{ width: '100%', height: 274 }}
                    center={['50%', '60%']}
                    radius={['20%', '60%']}
                    color={[
                        '#E53936',
                        '#D91A60',
                        '#8F23AA',
                        '#7F46F2',
                        '#4054EB',
                        '#17A4F3',
                        '#059BE5',
                        '#03ACC1',
                        '#009688',
                        '#44A047',
                        '#C0CA33',
                        '#FDD835'
                    ]}
                    pieData={pieData}
                />
            </div>
        );
    }
}

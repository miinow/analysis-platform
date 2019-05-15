import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Divider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './timer.scss';
import { dateRange } from './config';

moment.locale('zh-cn');

const { RangePicker } = DatePicker;
class Timer extends PureComponent {
    constructor() {
        super();
        this.noHigh = '#DFEAFC';
        this.high = '#0287e9';
        this.state = {};
    }

    disabledDate = cur => cur && cur > moment().add(-1, 'day');

    render() {
        const {
            startDate,
            compareStartDate,
            compareType,
            changeTime,
            changeTimeComp,
            similarTimer,
            hoopTimer
        } = this.props;
        return (
            <div className="timer">
                <RangePicker
                    className="time"
                    ranges={dateRange}
                    format="YYYY.MM.DD"
                    disabledDate={this.disabledDate}
                    value={startDate}
                    defaultValue={startDate}
                    onChange={changeTime}
                />
                <a onClick={hoopTimer} style={{ color: compareType === 1 ? this.high : this.noHigh }}>
                    环比
                </a>
                <Divider type="vertical" />
                <a onClick={similarTimer} style={{ color: compareType === 0 ? this.high : this.noHigh }}>
                    同比
                </a>
                <span className="contrast">对比时间：</span>
                <RangePicker
                    format="YYYY.MM.DD"
                    disabledDate={this.disabledDate}
                    value={compareStartDate}
                    defaultValue={compareStartDate}
                    onChange={changeTimeComp}
                />
            </div>
        );
    }
}

Timer.propTypes = {
    startDate: PropTypes.array,
    compareStartDate: PropTypes.array,
    compareType: PropTypes.number,
    changeTime: PropTypes.func,
    changeTimeComp: PropTypes.func,
    similarTimer: PropTypes.func,
    hoopTimer: PropTypes.func
};
export default Timer;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { message, Button } from 'antd';
import { connect } from 'react-redux';
import actions from '../../../../store/actions/OfflineAnalysis';
import moment from 'moment';
import 'moment/locale/zh-cn';

import { Timer, Radios } from '../../../../components';
import { channelData } from '../../config/config';

moment.locale('zh-cn');
const offlineStateToProps = state => {
    return {
        offlineAnalysis: state.offlineAnalysis
    };
};
@connect(
    offlineStateToProps,
    actions
)
class Header extends PureComponent {
    constructor() {
        super();
        this.state = {
            highClass: ''
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = e => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop > 20) {
            this.setState({
                highClass: 'highClass'
            });
        } else {
            this.setState({
                highClass: ''
            });
        }
    };
    changeTime = (dates, dateStrings) => {
        if (dates.length > 0) {
            const startDays = dates[1].diff(dates[0], 'days');
            let v;
            if (startDays + 1 <= 60) {
                v = 'day';
            } else if (startDays + 1 <= 730) {
                v = 'month';
            } else if (startDays + 1 > 730) {
                v = 'year';
            }
            this.props.change_saleRadio(v);
        }
        this.props.change_startDate(dates);
        const { compareType } = this.props.offlineAnalysis;
        const date =
            compareType === 0
                ? dates.map(item => moment(item).add(-1, 'Y'))
                : compareType === 1
                ? this.handleDates(dates)
                : [];
        this.props.change_compareStartDate(date);
    };
    changeTimeComp = (dates, dateStrings) => {
        // 规则 1.选择时间总天数不能超过开始时间 2.不能超过开始时间
        if (dates.length === 0) return false;
        const { startDate } = this.props.offlineAnalysis;
        if (startDate.length === 0) {
            message.warning('请先选择初始时间');
            return false;
        }
        const startDays = startDate[1].diff(startDate[0], 'days');
        const startDaysComp = dates[1].diff(dates[0], 'days');
        if (startDate[0].diff(dates[1], 'days') <= 0) {
            message.warning(`对比时间不得大于等于开始时间`);
            return false;
        }
        if (startDaysComp > startDays) {
            message.warning(`时间间隔不得大于开始时间`);
            return false;
        }
        this.props.change_compareType(2);
        this.props.change_compareStartDate(dates);
    };

    similarTimer = _ => {
        // 同比： 比较去年时间 =>0
        const { startDate } = this.props.offlineAnalysis;
        if (startDate.length === 0) {
            message.warning('请先选择初始时间');
            return false;
        }
        this.props.change_compareType(0);

        const date = startDate.map(item => moment(item).add(-1, 'Y'));
        this.props.change_compareStartDate(date);
    };

    hoopTimer = _ => {
        // 环比： 比较上个月时间 => 1
        const { startDate } = this.props.offlineAnalysis;
        if (startDate.length === 0) {
            message.warning('请先选择初始时间');
            return false;
        }
        this.props.change_compareType(1);

        // 判断开始时间是否是最后一天 如果是最后一天，环比为上个月的一整月
        const date = this.handleDates(startDate);
        this.props.change_compareStartDate(date);
    };
    handleDates = startDate => {
        const newStartData = startDate;
        const daysInMonth = moment(newStartData[0]).daysInMonth(); // 月份多少天
        const day = moment(newStartData[1]).get('date'); // 最后一日日期
        if (daysInMonth === day) {
            return [
                moment(newStartData[0]).add(-1, 'M'),
                moment(newStartData[0])
                    .add(-1, 'M')
                    .endOf('month')
            ];
        } else {
            return newStartData.map(item => moment(item).add(-1, 'M'));
        }
    };
    changeSale = e => {
        this.props.change_channel(e.target.value);
    };

    render() {
        const { queryData } = this.props;
        const { startDate, compareStartDate, compareType, channel } = this.props.offlineAnalysis;
        const { highClass } = this.state;
        return (
            <div className={`title clear ${highClass}`}>
                <Timer
                    startDate={startDate}
                    compareStartDate={compareStartDate}
                    compareType={compareType}
                    changeTime={this.changeTime}
                    changeTimeComp={this.changeTimeComp}
                    similarTimer={this.similarTimer}
                    hoopTimer={this.hoopTimer}
                />
                <Radios name="销售渠道" data={channelData} value={channel} changeTimeType={this.changeSale} />
                <Button onClick={queryData} className="query" type="primary">
                    查询
                </Button>
            </div>
        );
    }
}

Header.propTypes = {
    offlineAnalysis: PropTypes.object,
    change_startDate: PropTypes.func,
    change_compareType: PropTypes.func,
    change_compareStartDate: PropTypes.func,
    change_saleRadio: PropTypes.func,
    queryData: PropTypes.func,
    change_channel: PropTypes.func,
    channel: PropTypes.string
};
export default Header;

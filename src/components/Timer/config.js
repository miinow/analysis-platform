import moment from 'moment';

const dateRange = {
    昨日: [moment().add(-1, 'day'), moment().add(-1, 'day')],
    上周: [
        moment()
            .add(-1, 'w')
            .startOf('week'),
        moment()
            .add(-1, 'w')
            .endOf('week')
    ],
    本周: [moment().startOf('week'), moment().add(-1, 'day')],
    上月: [
        moment()
            .add(-1, 'M')
            .startOf('month'),
        moment()
            .add(-1, 'M')
            .endOf('month')
    ],
    本月: [moment().startOf('month'), moment().add(-1, 'day')],
    过去7天: [moment().add(-7, 'day'), moment().add(-1, 'day')],
    过去30天: [moment().add(-30, 'day'), moment().add(-1, 'day')]
};
export { dateRange };

import * as types from '../action-types';
import produce from 'immer';
import moment from 'moment';

const initState = {
    startDate: [
        moment().date() === 1
            ? moment()
                  .add(-1, 'M')
                  .startOf('month')
            : moment().startOf('month'),
        moment().date() === 1
            ? moment()
                  .add(-1, 'M')
                  .endOf('month')
            : moment().add(-1, 'day')
    ],
    compareStartDate: [
        moment().date() === 1
            ? moment()
                  .add(-1, 'M')
                  .startOf('month')
                  .add(-1, 'Y')
            : moment()
                  .startOf('month')
                  .add(-1, 'Y'),
        moment().date() === 1
            ? moment()
                  .add(-1, 'M')
                  .endOf('month')
                  .add(-1, 'Y')
            : moment()
                  .add(-1, 'day')
                  .add(-1, 'Y')
    ],
    compareType: 0, // 0=>同比 1=>环比 2=>对比时间
    saleRadio: 'day',
    channel: '10,16'
};

const offlineAnalysis = (state = initState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case types.OFFLINE_STARTDATE:
                draft.startDate = action.startDate;
                return draft;
            case types.OFFLINE_COMPARESTARTDATE:
                draft.compareStartDate = action.compareStartDate;
                return draft;
            case types.OFFLINE_COMPARETYPE:
                draft.compareType = action.compareType;
                return draft;
            case types.OFFLINE_SALERADIO:
                draft.saleRadio = action.saleRadio;
                return draft;
            case types.OFFLINE_CHANNEL:
                draft.channel = action.channel;
                return draft;
            default:
                return draft;
        }
    });

export default offlineAnalysis;

import * as types from '../action-types';

export default {
    change_startDate(startDate) {
        return {
            type: types.OFFLINE_STARTDATE,
            startDate
        };
    },
    change_compareStartDate(compareStartDate) {
        return {
            type: types.OFFLINE_COMPARESTARTDATE,
            compareStartDate
        };
    },
    change_compareType(compareType) {
        return {
            type: types.OFFLINE_COMPARETYPE,
            compareType
        };
    },
    change_saleRadio(saleRadio) {
        return {
            type: types.OFFLINE_SALERADIO,
            saleRadio
        };
    },
    change_channel(channel) {
        return {
            type: types.OFFLINE_CHANNEL,
            channel
        };
    }
};

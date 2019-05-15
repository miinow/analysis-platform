import * as types from '../action-types';

export default {
    change_filter(filter) {
        return { type: types.SOURCECHANGE_FILTER, filter };
    },
    change_page(pageNo, pageSize) {
        return {
            type: types.SOURCECHANGE_PAGE,
            pageNo,
            pageSize
        };
    },
    get_data(params) {
        return { type: types.SOURCESET_REQUESTED, params };
    },
    del_data(params) {
        return { type: types.SOURCESET_DEL, ...params };
    }
};

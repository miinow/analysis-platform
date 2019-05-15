import * as types from '../action-types';
import produce from 'immer';

const initState = {
    tableLoading: false,
    totalCount: 0,
    dataList: [],
    changeFilter: {},
    pageNo: 1,
    pageSize: 20
};

const sourceSet = (state = initState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case types.SOURCESET_REQUESTED:
                draft.tableLoading = true;
                return draft;
            case types.SOURCESET_SUCCEEDED: {
                draft.tableLoading = false;
                const { dataList = [], totalCount } = action.data;
                dataList.forEach((ele, index) => {
                    ele.key = (state.pageNo - 1) * state.pageSize + (index + 1);
                });
                draft.dataList = dataList;
                draft.totalCount = totalCount;
                return draft;
            }
            case types.SOURCECHANGE_PAGE:
                draft.pageNo = action.pageNo;
                draft.pageSize = action.pageSize;
                return draft;
            case types.SOURCESET_FAILED: {
                draft.tableLoading = false;
                draft.tableData = [];
                draft.totalCount = 0;
                return draft;
            }
            case types.SOURCECHANGE_FILTER: {
                draft.changeFilter = action.filter;
                return draft;
            }
            case types.SOURCESET_DEL: {
                return draft;
            }
            default:
                return draft;
        }
    });

export default sourceSet;

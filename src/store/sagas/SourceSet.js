import { call, put, takeEvery } from 'redux-saga/effects';
import { message } from 'antd';
import * as types from '../action-types';
import { getData } from '../../api/axiosApi';

function* getSource(action) {
    try {
        const { params } = action;
        const url = `/getAccessSource/getsourceList`;
        const data = yield call(getData, url, params);
        yield put({ type: types.SOURCESET_SUCCEEDED, data });
    } catch (e) {
        yield put({ type: types.SOURCESET_FAILED, message: e.message });
    }
}

function* watchGetSource() {
    yield takeEvery(types.SOURCESET_REQUESTED, getSource);
}

function* delSource(action) {
    try {
        const { id, pageSize } = action;
        const url = `/getAccessSource/deleteSourceById`;
        const result = yield call(getData, url, { id }, true, 'post');
        const { code } = result;
        if (code === 200) {
            message.success('删除成功');
            const params = {
                pageNo: 1,
                pageSize
            };
            yield put({ type: types.SOURCESET_REQUESTED, params });
        } else {
            message.error(`删除失败`);
        }
    } catch (e) {
        message.error(`删除失败`);
        console.log(e);
    }
}

function* watchDelSource() {
    yield takeEvery(types.SOURCESET_DEL, delSource);
}

export { watchGetSource, watchDelSource };

import { all } from 'redux-saga/effects';
import { watchGetSource, watchDelSource } from './SourceSet';

export default function* rootSaga() {
    yield all([
        watchGetSource(),
        watchDelSource()
    ]);
}

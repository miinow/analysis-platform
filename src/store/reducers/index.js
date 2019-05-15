import { combineReducers } from 'redux';
import source from './SourceSet';
import offlineAnalysis from './OfflineAnalysis';

const reduces = combineReducers({
    source,
    offlineAnalysis
});

export default reduces;

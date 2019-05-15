import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import Router from './Router';
import './assets/svg/index';
import './assets/css/normalize.scss';
import './assets/css/Rewrite.antd.scss';

ReactDOM.render(
    <LocaleProvider locale={zh_CN}>
        <Router />
    </LocaleProvider>,
    document.getElementById('root')
);

import { ExamplePage, OfflineAnalysis } from '../pages';
import HeatMapPage from '../pages/ExamplePage/heatMapPage';
// import PieLineDemo from '../pages/ExamplePage/PieLineDemo';
import StackBarPage from '../pages/ExamplePage/StackBar';

export const basePath = '/';

const path = basePath === '/' ? '' : basePath;

export const navData = [
    {
        title: '营销分析',
        path: `${path}/marketing`,
        icon: 'sourceData',
        key: 'marketing',
        component: StackBarPage
    },
    {
        title: '商品分析',
        path: `${path}/goods`,
        icon: 'targetSource',
        key: 'goods',
        component: ExamplePage
    },
    {
        title: '交易分析',
        subs: [
            {
                title: '线下交易分析',
                path: `${path}/offlineTrade`,
                key: 'offlineTrade',
                component: OfflineAnalysis,
                redirect: basePath
            },
            { title: '订单流转分析', path: `${path}/orderTransfer`, key: 'orderTransfer', component: ExamplePage },
            { title: '订单转化分析', path: `${path}/orderTransform`, key: 'orderTransform', component: ExamplePage }
            // {
            //     title: 'demo',
            //     path: `${path}/demo`,
            //     key: 'PieLineDemo',
            //     component: PieLineDemo
            // }
        ],
        key: 'trade',
        icon: 'server'
    },
    {
        title: '运营分析',
        path: `${path}/operation`,
        icon: 'task',
        key: 'operation',
        component: ExamplePage
    },
    {
        title: '会员分析',
        path: `${path}/member`,
        icon: 'monitor',
        key: 'member',
        component: HeatMapPage
    }
];

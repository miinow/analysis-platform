import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { message, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import actions from '../../store/actions/OfflineAnalysis';
import './index.scss';

import { getData } from '../../api/axiosApi';
import { Radios, Selectors } from '../../components';
import { saleMember, cateMember, urlParams } from './config/config';
import {
    Header,
    SurveyFont,
    SurveyTablePie,
    CitySale,
    SaleMember,
    SaleFont,
    RegionSale,
    DepartSale,
    CategorySale,
    RegionCate2,
    HeatMap,
    MemberFont,
    RegionMember,
    Members,
    PurchaseTrend,
    T20Cate3,
    TOP10Cat
} from './component';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const rat = {
    0: '同比',
    1: '环比',
    2: '对比'
};
const offlineStateToProps = state => {
    return {
        offlineAnalysis: state.offlineAnalysis
    };
};

const selectorUrls = [
    '/service-mercury/dataAnalysis/selectRegionAndBranch',
    '/service-mercury/dataAnalysis/selectcategories'
];

@connect(
    offlineStateToProps,
    actions
)
class offlineAnalysis extends PureComponent {
    constructor() {
        super();
        this.finalParams = {};
        this.state = {
            memberType: '', // 新老会员
            surveyFont: {},
            surveyTable: [],
            surveyChart: [],
            cityMapData: {},
            cityTableData: [],
            tendency: [],
            unit: rat[0],
            saleFont: {},
            regionSales: {},
            departSale: {},
            catSales: [],
            cat1Sales: [],
            regionCate2Data: {},
            regionCate34Data: {},
            heatMapData: {},
            memberFontInfo: [],
            memberReData: [],
            members: [],
            cat2Member: [],
            buyFrequency: [],
            buyMemberFreq: [],
            t20cate3: [],
            top10cat: [],
            top6Cat3Member: [],
            regionAndCat34: [],
            selectorRegionParams: {
                region_name: '',
                branch_name_1: ''
            },
            selectorData0: [
                // 各分部销售情况下拉框信息
                {
                    params: 'region_name',
                    name: '大区筛选',
                    value: '华北一区',
                    data: [],
                    changeSelector: this.changeRegion0
                },
                {
                    params: 'branch_name_1',
                    name: '一级分部筛选',
                    value: undefined,
                    data: [],
                    changeSelector: this.changeBranch0
                },
                {
                    params: 'branch_name_2',
                    name: '二级分部筛选',
                    value: undefined,
                    data: [],
                    changeSelector: this.changeBranch1
                }
            ],
            selectorParams0: {
                // 各分部销售情况下拉框查询参数
                region_name: '',
                branch_name_1: ''
            },
            selectorData1: [
                // 大区-品类销售一级分类下拉框信息
                {
                    params: 'off_cat_name1',
                    name: '一级品类',
                    value: '销售',
                    data: [],
                    changeSelector: this.changeCat0
                }
            ],
            selectorData2: [
                // 大区-品类销售三四级分类下拉框信息
                {
                    params: 'region_name',
                    name: '大区',
                    value: undefined,
                    data: [],
                    changeSelector: this.changeRegion1
                },
                {
                    params: 'off_cat_name2',
                    name: '二级品类',
                    value: undefined,
                    data: [],
                    changeSelector: this.changeCat1
                },
                {
                    params: 'off_cat_name3',
                    name: '三级品类',
                    value: undefined,
                    data: [],
                    changeSelector: this.changeCat2
                }
            ],
            selectorParams1: {
                // 大区-品类销售下拉框查询参数
                off_cat_name1: '',
                off_cat_name2: '',
                region_name: ''
            },
            selectorData3: [
                // 大区-品类购买会员分布一级分类下拉框信息
                {
                    params: 'off_cat_name1',
                    name: '一级品类',
                    value: '销售',
                    data: [],
                    changeSelector: this.changeCat3
                }
            ],
            selectorData4: [
                // 大区-品类购买会员分布三四级分类下拉框信息
                {
                    params: 'region_name',
                    name: '大区',
                    value: '华北一区',
                    data: [],
                    changeSelector: this.changeRegion2
                },
                {
                    params: 'off_cat_name2',
                    name: '二级品类',
                    value: undefined,
                    data: [],
                    changeSelector: this.changeCat4
                },
                {
                    params: 'off_cat_name3',
                    name: '三级品类',
                    value: undefined,
                    data: [],
                    changeSelector: this.changeCat5
                }
            ],
            selectorParams2: {
                // 大区-品类购买会员分布下拉框查询参数
                off_cat_name1: '',
                off_cat_name2: '',
                region_name: '华北一区'
            },
            branchDistributionTitle: '',
            regionCatTitle: '',
            regionCatMemberTitle: '',
            branch_name_2: '', // 二级分部参数
            category3param0: '', // 销售分析三级品类参数
            category3param1: '', // 会员三级品类参数
            loading: false
        };
    }

    componentDidMount() {
        this.queryData();

        this.fetchSelector0();
        this.fetchSelector1();
        this.fetchSelector2();
    }
    componentWillUnmount() {}

    fetchSelectorBase = async (
        url,
        stateKey,
        paramsKey,
        dataKey,
        resetKeys = [],
        hasDefault = false,
        disabled = false
    ) => {
        const params = this.state[paramsKey];
        try {
            const res = await getData(selectorUrls[url], params);
            let handledRes = res.map(item => ({ value: item, label: item }));
            if (disabled) handledRes = [{ label: '不限', value: '' }].concat(handledRes);
            const selector = this.state[stateKey];
            for (const item of selector) {
                if (item.params === dataKey) {
                    item.data = handledRes;
                    if (hasDefault) {
                        item.value = handledRes[0].value;
                        params[dataKey] = handledRes[0].value;
                    }
                }
                if (~resetKeys.indexOf(item.params)) {
                    item.value = undefined;
                }
            }
            this.setState({
                [stateKey]: [...selector],
                [paramsKey]: { ...params }
            });
        } catch (error) {
            console.log(error);
        }
    };
    handleErrorBase = () => {
        message.error('更新数据失败，请重试！');
    };
    switchSelectorVal = (val, stateKey, dataKey) => {
        const selector = this.state[stateKey];
        for (const item of selector) {
            if (item.params === dataKey) {
                item.value = val;
                break;
            }
        }
        return selector;
    };
    // 初始化各分部销售情况下拉框信息
    fetchSelector0 = async () => {
        try {
            await this.fetchSelectorBase(0, 'selectorData0', 'selectorParams0', 'region_name');
            this.setState(
                {
                    selectorParams0: {
                        region_name: '华北一区',
                        branch_name_1: ''
                    }
                },
                () => {
                    this.fetchSelectorBase(0, 'selectorData0', 'selectorParams0', 'branch_name_1', [], false, true);
                }
            );
        } catch (error) {
            console.log(error);
        }
    };
    // 各分部销售情况大区改变
    changeRegion0 = val => {
        const selector = this.switchSelectorVal(val, 'selectorData0', 'region_name');
        selector[2].data = [];
        this.setState(
            {
                selectorParams0: {
                    region_name: val,
                    branch_name_1: ''
                },
                selectorData0: [...selector],
                loading: true
            },
            async () => {
                try {
                    await this.fetchSelectorBase(
                        0,
                        'selectorData0',
                        'selectorParams0',
                        'branch_name_1',
                        ['branch_name_1', 'branch_name_2'],
                        false,
                        true
                    );
                    await this.updateBranchDistribution('一级分部');
                } catch (error) {
                    console.log(error);
                    this.handleErrorBase();
                } finally {
                    this.setState({
                        loading: false
                    });
                }
            }
        );
    };
    // 各分部销售情况一级分部改变
    changeBranch0 = val => {
        const selector = this.switchSelectorVal(val, 'selectorData0', 'branch_name_1');
        if (!val) {
            // 不限
            selector[2].data = [];
            this.setState(
                {
                    selectorParams0: {
                        ...this.state.selectorParams0,
                        branch_name_1: val
                    },
                    selectorData0: [...selector],
                    loading: true
                },
                async () => {
                    try {
                        await this.updateBranchDistribution('一级分部');
                    } catch (error) {
                        console.log(error);
                        this.handleErrorBase();
                    } finally {
                        this.setState({
                            loading: false
                        });
                    }
                }
            );
        } else {
            this.setState(
                {
                    selectorParams0: {
                        ...this.state.selectorParams0,
                        branch_name_1: val
                    },
                    selectorData0: [...selector],
                    loading: true
                },
                async () => {
                    try {
                        await this.fetchSelectorBase(
                            0,
                            'selectorData0',
                            'selectorParams0',
                            'branch_name_2',
                            ['branch_name_2'],
                            false,
                            true
                        );
                        await this.updateBranchDistribution('二级分部');
                    } catch (error) {
                        console.log(error);
                        this.handleErrorBase();
                    } finally {
                        this.setState({
                            loading: false
                        });
                    }
                }
            );
        }
    };
    // 各分部销售情况二级分部改变
    changeBranch1 = val => {
        const selector = this.switchSelectorVal(val, 'selectorData0', 'branch_name_2');
        this.setState(
            {
                selectorData0: [...selector],
                loading: true
            },
            async () => {
                try {
                    if (!val) {
                        await this.updateBranchDistribution('二级分部');
                    } else {
                        await this.updateBranchDistribution('门店', val);
                    }
                } catch (error) {
                    console.log(error);
                    this.handleErrorBase();
                } finally {
                    this.setState({
                        loading: false
                    });
                }
            }
        );
    };

    // 初始化大区-品类销售下拉框信息
    fetchSelector1 = () => {
        const params = this.state.selectorParams1;
        const { startDate, channel } = this.props.offlineAnalysis;
        const { memberType } = this.state;
        this.setState(
            {
                selectorParams1: {
                    ...params,
                    startDate: moment(startDate[0]).format('YYYY-MM-DD'),
                    endDate: moment(startDate[1]).format('YYYY-MM-DD'),
                    channel,
                    memberType
                }
            },
            async () => {
                await this.fetchSelectorBase(1, 'selectorData1', 'selectorParams1', 'off_cat_name1');
                this.setState(
                    {
                        selectorParams1: {
                            ...this.state.selectorParams1,
                            off_cat_name1: '销售'
                        }
                    },
                    async () => {
                        this.fetchSelectorBase(
                            0,
                            'selectorData2',
                            'selectorRegionParams',
                            'region_name',
                            [],
                            false,
                            true
                        );
                        await this.fetchSelectorBase(1, 'selectorData2', 'selectorParams1', 'off_cat_name2', [], true);
                        this.fetchSelectorBase(1, 'selectorData2', 'selectorParams1', 'off_cat_name3', [], false, true);
                    }
                );
            }
        );
    };
    // 大区-品类销售一级品类改变
    changeCat0 = val => {
        const selector = this.switchSelectorVal(val, 'selectorData1', 'off_cat_name1');
        this.setState(
            {
                selectorParams1: {
                    ...this.state.selectorParams1,
                    off_cat_name1: val,
                    off_cat_name2: ''
                },
                selectorData1: [...selector],
                loading: true
            },
            async () => {
                try {
                    await this.fetchSelectorBase(
                        1,
                        'selectorData2',
                        'selectorParams1',
                        'off_cat_name2',
                        ['off_cat_name3'],
                        true
                    );
                    await this.fetchSelectorBase(
                        1,
                        'selectorData2',
                        'selectorParams1',
                        'off_cat_name3',
                        [],
                        false,
                        true
                    );
                    await this.updateRegionCate2Data();
                    await this.updateHeatMapData();
                    if (this.state.selectorParams1.region_name) {
                        await this.updateRegionCate34Distribution();
                    } else {
                        await this.updateRegionCate34Data();
                    }
                } catch (error) {
                    console.log(error);
                    this.handleErrorBase();
                } finally {
                    this.setState({
                        loading: false
                    });
                }
            }
        );
    };
    // 大区-品类销售大区改变
    changeRegion1 = val => {
        const selector = this.switchSelectorVal(val, 'selectorData2', 'region_name');
        this.setState(
            {
                selectorParams1: {
                    ...this.state.selectorParams1,
                    region_name: val
                },
                selectorData2: [...selector],
                loading: true
            },
            async () => {
                try {
                    await this.fetchSelectorBase(1, 'selectorData2', 'selectorParams1', 'off_cat_name2', [
                        'off_cat_name3'
                    ]);
                    await this.fetchSelectorBase(
                        1,
                        'selectorData2',
                        'selectorParams1',
                        'off_cat_name3',
                        [],
                        false,
                        true
                    );
                    if (!val) {
                        await this.updateRegionCate34Data();
                    } else {
                        await this.updateRegionCate34Distribution();
                    }
                    this.updateHeatMapData();
                } catch (error) {
                    console.log(error);
                    this.handleErrorBase();
                } finally {
                    this.setState({
                        loading: false
                    });
                }
            }
        );
    };
    // 大区-品类销售二级品类改变
    changeCat1 = val => {
        const selector = this.switchSelectorVal(val, 'selectorData2', 'off_cat_name2');
        this.setState(
            {
                selectorParams1: {
                    ...this.state.selectorParams1,
                    off_cat_name2: val
                },
                selectorData2: [...selector],
                loading: true
            },
            async () => {
                try {
                    await this.fetchSelectorBase(
                        1,
                        'selectorData2',
                        'selectorParams1',
                        'off_cat_name3',
                        ['off_cat_name3'],
                        false,
                        true
                    );
                    if (this.state.selectorParams1.region_name) {
                        await this.updateRegionCate34Distribution();
                    } else {
                        await this.updateRegionCate34Data();
                    }
                    await this.updateHeatMapData();
                } catch (error) {
                    console.log(error);
                    this.handleErrorBase();
                } finally {
                    this.setState({
                        loading: false
                    });
                }
            }
        );
    };
    // 大区-品类销售三级品类改变
    changeCat2 = val => {
        const selector = this.switchSelectorVal(val, 'selectorData2', 'off_cat_name3');
        this.setState(
            {
                selectorData2: [...selector],
                loading: true
            },
            async () => {
                try {
                    if (this.state.selectorParams1.region_name) {
                        await this.updateRegionCate34Distribution(val);
                    } else {
                        await this.updateRegionCate34Data(val);
                    }
                    await this.updateHeatMapData();
                } catch (error) {
                    console.log(error);
                    this.handleErrorBase();
                } finally {
                    this.setState({
                        loading: false
                    });
                }
            }
        );
    };

    // 初始化大区-品类购买会员分布下拉框信息
    fetchSelector2 = () => {
        const params = this.state.selectorParams2;
        const { startDate, channel } = this.props.offlineAnalysis;
        const { memberType } = this.state;
        this.setState(
            {
                selectorParams2: {
                    ...params,
                    startDate: moment(startDate[0]).format('YYYY-MM-DD'),
                    endDate: moment(startDate[1]).format('YYYY-MM-DD'),
                    channel,
                    memberType
                }
            },
            async () => {
                await this.fetchSelectorBase(1, 'selectorData3', 'selectorParams2', 'off_cat_name1');
                this.setState(
                    {
                        selectorParams2: {
                            ...this.state.selectorParams2,
                            off_cat_name1: '销售'
                        }
                    },
                    async () => {
                        this.fetchSelectorBase(
                            0,
                            'selectorData4',
                            'selectorRegionParams',
                            'region_name',
                            [],
                            false,
                            true
                        );
                        await this.fetchSelectorBase(1, 'selectorData4', 'selectorParams2', 'off_cat_name2', [], true);
                        this.fetchSelectorBase(1, 'selectorData4', 'selectorParams2', 'off_cat_name3', [], false, true);
                    }
                );
            }
        );
    };
    // 大区-品类购买会员分布一级品类改变
    changeCat3 = val => {
        const selector = this.switchSelectorVal(val, 'selectorData3', 'off_cat_name1');
        this.setState(
            {
                selectorParams2: {
                    ...this.state.selectorParams2,
                    off_cat_name1: val,
                    off_cat_name2: ''
                },
                selectorData3: [...selector]
            },
            async () => {
                await this.fetchSelectorBase(
                    1,
                    'selectorData4',
                    'selectorParams2',
                    'off_cat_name2',
                    ['off_cat_name3'],
                    true
                );
                this.fetchSelectorBase(1, 'selectorData4', 'selectorParams2', 'off_cat_name3', [], false, true);
                this.updateCat2member();
                if (this.state.selectorParams2.region_name) {
                    this.updateTop6Cat3Member();
                } else {
                    this.updateTop10cat();
                }
            }
        );
    };
    // 大区-品类购买会员分布大区改变
    changeRegion2 = val => {
        const selector = this.switchSelectorVal(val, 'selectorData4', 'region_name');
        this.setState(
            {
                selectorParams2: {
                    ...this.state.selectorParams1,
                    region_name: val
                },
                selectorData4: [...selector],
                loading: true
            },
            async () => {
                try {
                    await this.fetchSelectorBase(1, 'selectorData4', 'selectorParams2', 'off_cat_name2', [
                        'off_cat_name3'
                    ]);
                    await this.fetchSelectorBase(1, 'selectorData4', 'selectorParams2', 'off_cat_name3', false, true);
                    if (!val) {
                        await this.updateTop10cat();
                    } else {
                        await this.updateTop6Cat3Member();
                    }
                } catch (error) {
                    console.log(error);
                    this.handleErrorBase();
                } finally {
                    this.setState({
                        loading: false
                    });
                }
            }
        );
    };
    // 大区-品类购买会员分布二级品类改变
    changeCat4 = val => {
        const selector = this.switchSelectorVal(val, 'selectorData4', 'off_cat_name2');
        this.setState(
            {
                selectorParams2: {
                    ...this.state.selectorParams2,
                    off_cat_name2: val
                },
                selectorData4: [...selector],
                loading: true
            },
            async () => {
                try {
                    await this.fetchSelectorBase(
                        1,
                        'selectorData4',
                        'selectorParams2',
                        'off_cat_name3',
                        ['off_cat_name3'],
                        false,
                        true
                    );
                    if (this.state.selectorParams2.region_name) {
                        await this.updateTop6Cat3Member();
                    } else {
                        await this.updateTop10cat();
                    }
                } catch (error) {
                    console.log(error);
                    this.handleErrorBase();
                } finally {
                    this.setState({
                        loading: false
                    });
                }
            }
        );
    };
    // 大区-品类购买会员分布三级品类改变
    changeCat5 = val => {
        const selector = this.switchSelectorVal(val, 'selectorData4', 'off_cat_name3');
        this.setState(
            {
                selectorData4: [...selector],
                loading: true
            },
            async () => {
                try {
                    if (this.state.selectorParams2.region_name) {
                        await this.updateTop6Cat3Member(val);
                    } else {
                        await this.updateTop10cat(val);
                    }
                } catch (error) {
                    console.log(error);
                    this.handleErrorBase();
                } finally {
                    this.setState({
                        loading: false
                    });
                }
            }
        );
    };

    // 更新分部销售情况图表
    updateBranchDistribution = async (title, secondBranch = '', useStateBranch = false) => {
        let params = this.getParam();
        if (useStateBranch) secondBranch = this.state.branch_name_2;
        params = {
            ...params,
            ...this.state.selectorParams0,
            branch_name_2: secondBranch
        };
        const departSale = await getData(urlParams.branchDistribution, params);
        this.setState({
            departSale,
            branchDistributionTitle: `${title}的销售情况`,
            branch_name_2: secondBranch
        });
    };

    // 更新各大区重点二级品类图表
    updateRegionCate2Data = async () => {
        let params = this.getParam();
        params = {
            ...params,
            off_cat_name1: this.state.selectorParams1.off_cat_name1
        };
        const regionCate2Data = await getData(urlParams.keyCat2SalesDistribution, params);
        this.setState({
            regionCate2Data
        });
    };
    // 更新各大区重点三四级品类图表
    updateRegionCate34Data = async (categoryThird = '', useStateCate = false) => {
        let params = this.getParam();
        const { off_cat_name1, off_cat_name2 } = this.state.selectorParams1;
        if (useStateCate) categoryThird = this.state.category3param0;
        params = {
            ...params,
            off_cat_name1,
            off_cat_name2,
            off_cat_name3: categoryThird
        };
        const regionCate34Data = await getData(urlParams.cat34WithoutRegion, params);
        this.setState({
            regionCate34Data,
            regionCatTitle: `各大区TOP6重点${categoryThird ? '四' : '三'}级品类`,
            category3param0: categoryThird
        });
    };
    // 更新选中大区三四级品类图表
    updateRegionCate34Distribution = async (categoryThird = '', useStateCate = false) => {
        let params = this.getParam();
        if (useStateCate) categoryThird = this.state.category3param0;
        params = {
            ...params,
            ...this.state.selectorParams1,
            off_cat_name3: categoryThird
        };
        const regionAndCat34 = await getData(urlParams.cat34WithRegion, params);
        this.setState({
            regionAndCat34,
            regionCatTitle: `${categoryThird ? '四' : '三'}级品类TOP10销售额分布`,
            category3param0: categoryThird
        });
    };
    // 更新各大区重点品牌图表
    updateHeatMapData = async (categoryThird = '', useStateCate = false) => {
        let params = this.getParam();
        if (useStateCate) categoryThird = this.state.category3param0;
        params = {
            ...params,
            ...this.state.selectorParams1,
            off_cat_name3: categoryThird,
            region_name: ''
        };
        const heatMapData = await getData(urlParams.brandTop10, params);
        this.setState({
            heatMapData,
            category3param0: categoryThird
        });
    };

    // 更新重点二级品类会员分布图表
    updateCat2member = async () => {
        let params = this.getParam();
        params = {
            ...params,
            memberType: this.state.memberType,
            off_cat_name1: this.state.selectorParams2.off_cat_name1
        };
        const cat2Member = await getData(urlParams.secondcategorymember, params);
        this.setState({
            cat2Member
        });
    };
    // 更新TOP10品类购买会员数及人均购买件数图表
    updateTop10cat = async (categoryThird = '', useStateCate = false) => {
        let params = this.getParam();
        if (useStateCate) categoryThird = this.state.category3param1;
        params = {
            ...params,
            ...this.state.selectorParams2,
            memberType: this.state.memberType,
            off_cat_name3: categoryThird
        };
        const cat2Member = await getData(urlParams.selecttop10categorymember, params);
        this.setState({
            cat2Member,
            category3param1: categoryThird
        });
    };
    // 更新各大区TOP重点品类会员量
    updateTop6Cat3Member = async (categoryThird = '', useStateCate = false) => {
        let params = this.getParam();
        if (useStateCate) categoryThird = this.state.category3param1;
        params = {
            ...params,
            ...this.state.selectorParams2,
            memberType: this.state.memberType,
            off_cat_name3: categoryThird
        };
        const top6Cat3Member = await getData(urlParams.selecttop6cat3member, params);
        this.setState({
            top6Cat3Member,
            regionCatMemberTitle: `各大区TOP6重点${categoryThird ? '四' : '三'}级品类会员量`,
            category3param1: categoryThird
        });
    };
    // 第一个模块 整体概况
    fetchData = async params => {
        const { saleRadio } = this.props.offlineAnalysis;
        const tendParams = params;
        tendParams.dimension = saleRadio;
        // => 整体概况
        try {
            const [surveyFont, surveyTable, surveyChart, cityMapData, cityTableData, tendency] = await Promise.all([
                getData(urlParams.description, params), // 文字叙述
                getData(urlParams.offlineSales, params), // 线下整体销售情况
                getData(urlParams.channelRatio, params), // 线下各渠道销售额占比
                getData(urlParams.distribution, params), // 城市销售分布
                getData(urlParams.citySalesLevel, params), // 不同城市等级的销售情况
                getData(urlParams.tendency, tendParams) // 销售趋势/购买会员趋势（暂定一个接口）
            ]);
            this.setState({
                surveyFont,
                surveyTable,
                surveyChart,
                cityMapData,
                cityTableData,
                tendency
            });
        } catch (error) {
            console.log(error);
            message.error('获取整体概况数据失败，请刷新重试！');
        }
    };
    // 第二个模块 销售分析
    fetchSaleData = async params => {
        // 销售分析 =》文字叙述
        // 大区分布销售
        // 各分布销售
        // 销售额分布
        // 一级品类销售
        // 各大区重点二级品类销售
        // 各大区top6重点三四级品类(不选择大区)
        // 热力图 top10重点品牌各大区销售
        // 各大区top6重点三四级品类（选择大区）
        const { off_cat_name1, off_cat_name2 } = this.state.selectorParams1;
        const { region_name, branch_name_1 } = this.state.selectorParams0;
        const { branch_name_2 } = this.state;
        const { category3param0 } = this.state;

        try {
            const [
                saleFont,
                regionSales,
                departSale,
                catSales,
                cat1Sales,
                regionCate2Data,
                regionCate34Data,
                heatMapData,
                regionAndCat34
            ] = await Promise.all([
                getData(urlParams.overview, { ...params, off_cat_name1 }), // 文字描述
                getData(urlParams.regionDistribution, params), // 大区整体销售/各大区销售占比
                getData(urlParams.branchDistribution, { ...params, region_name, branch_name_1, branch_name_2 }), // 各分部的销售情况
                getData(urlParams.cat1SalseDistribution1, params), // 销售额分布
                getData(urlParams.cat1SalesDistribution2, params), // 一级品类销售
                getData(urlParams.keyCat2SalesDistribution, { ...params, off_cat_name1 }), // 各大区重点二级品类销售
                getData(urlParams.cat34WithoutRegion, {
                    ...params,
                    off_cat_name1,
                    off_cat_name2,
                    off_cat_name3: category3param0
                }), // 各大区top6重点三四级品类(不选择大区)
                getData(urlParams.brandTop10, {
                    ...params,
                    region_name,
                    off_cat_name1,
                    off_cat_name2,
                    off_cat_name3: category3param0
                }), // 热力图 top10重点品牌各大区销售
                getData(urlParams.cat34WithRegion, {
                    ...params,
                    region_name,
                    off_cat_name1,
                    off_cat_name2,
                    off_cat_name3: category3param0
                }) // 各大区top6重点三四级品类（选择大区）
            ]);
            this.setState({
                saleFont,
                regionSales,
                departSale,
                catSales,
                cat1Sales,
                regionCate2Data,
                regionCate34Data,
                heatMapData,
                regionAndCat34,
                branchDistributionTitle: '一级分部的销售情况',
                regionCatTitle: '各大区TOP6重点三级品类'
            });
        } catch (error) {
            console.log(error);
            message.error('获取销售分析数据失败，请刷新重试！');
        }
    };
    // 第三个模块 购买会员分析
    fetchMember = async params => {
        // =>购买会员数
        const { memberType } = this.state;
        const { category3param1 } = this.state;
        const { off_cat_name1, off_cat_name2, region_name } = this.state.selectorParams2;
        try {
            const [
                memberFontInfo,
                memberReData,
                members,
                buyFrequency,
                buyMemberFreq,
                t20cate3,
                cat2Member,
                top10cat,
                top6Cat3Member
            ] = await Promise.all([
                getData(urlParams.overviewMember, { ...params, memberType, off_cat_name1 }), // 文字分析
                getData(urlParams.selectdistrictmember, params), // 各大区购买会员量
                getData(urlParams.memberdistribution, { ...params, memberType }), // 会员量分布
                getData(urlParams.selectmemberbuyfrequency, params), // 会员购买频次
                getData(urlParams.selectdifferentbuyfrequency, params), // 不同购买频次的会员量分布
                getData(urlParams.selecttop20cat3member, params), // 购买频次TOP20的三级品类分部
                getData(urlParams.secondcategorymember, { ...params, memberType, off_cat_name1 }), // 重点二级品类会员分布
                getData(urlParams.selecttop10categorymember, {
                    ...params,
                    memberType,
                    region_name,
                    off_cat_name1,
                    off_cat_name2,
                    off_cat_name3: category3param1
                }), // TOP10品类的购买会员数及人均购买件数
                getData(urlParams.selecttop6cat3member, {
                    ...params,
                    memberType,
                    off_cat_name1,
                    off_cat_name2,
                    off_cat_name3: category3param1
                }) // 各大区Top6重点三级品类会员量
            ]);
            this.setState({
                memberFontInfo,
                memberReData,
                members,
                buyFrequency,
                buyMemberFreq,
                t20cate3,
                cat2Member,
                top10cat,
                top6Cat3Member
            });
        } catch (error) {
            console.log(error);
            message.error('获取会员分析数据失败，请刷新重试！');
        }
    };
    queryData = () => {
        const params = this.getParam(true);
        if (!params) return false;
        this.finalParams = { ...this.props.offlineAnalysis };
        const { compareType } = this.finalParams;
        this.setState({ unit: rat[compareType] });

        this.setState(
            {
                loading: true
            },
            async () => {
                try {
                    // 第一个模块
                    await this.fetchData(params);
                    // 第二个模块 销售分析
                    await this.fetchSaleData(params);
                    // 第三个模块 购买会员分析
                    await this.fetchMember(params);
                } catch (error) {
                    console.log(error);
                } finally {
                    this.setState({
                        loading: false
                    });
                }
            }
        );
    };

    handleSelect = (v, form) => {
        console.log(v);
        console.log(form);
    };
    getParam = flag => {
        let startDate, compareStartDate, compareType, channel;
        const props = this.props.offlineAnalysis;
        if (flag) {
            startDate = props.startDate;
            compareStartDate = props.compareStartDate;
            compareType = props.compareType;
            channel = props.channel;
        } else {
            startDate = this.finalParams.startDate;
            compareStartDate = this.finalParams.compareStartDate;
            compareType = this.finalParams.compareType;
            channel = this.finalParams.channel;
        }
        // const { startDate, compareStartDate, compareType, channel } = this.props.offlineAnalysis;
        if (startDate.length === 0) {
            message.warning('请先选择初始时间');
            return false;
        } else if (compareStartDate.length === 0 || compareType === 3) {
            message.warning('请设置对比时间');
            return false;
        }
        return {
            channel,
            compareType,
            startDate: moment(startDate[0]).format('YYYY-MM-DD'),
            endDate: moment(startDate[1]).format('YYYY-MM-DD'),
            compareStartDate: moment(compareStartDate[0]).format('YYYY-MM-DD'),
            compareEndDate: moment(compareStartDate[1]).format('YYYY-MM-DD')
        };
    };
    changeTimeType = e => {
        const params = this.getParam();
        const v = e.target.value;
        if (!params) return false;
        params.dimension = v;
        this.props.change_saleRadio(v);

        this.setState({ loading: true }, () => {
            getData(urlParams.tendency, params)
                .then(tendency => {
                    this.setState({ tendency });
                })
                .catch(error => {
                    console.log(error);
                    this.handleErrorBase();
                })
                .finally(() => {
                    this.setState({ loading: false });
                });
        });
    };
    changeMemType = e => {
        const params = this.getParam();
        const v = e.target.value;
        if (!params) return false;
        params.memberType = v;
        this.setState({ memberType: v, loading: true }, async () => {
            try {
                const { region_name } = this.state.selectorParams2;
                // 重点二级品类会员分布图表
                await this.updateCat2member();
                if (region_name) {
                    // 各大区Top6重点三级品类会员量
                    await this.updateTop6Cat3Member();
                } else {
                    // TOP10品类购买会员数及人均购买件数图表
                    await this.updateTop10cat();
                }
                // 会员量分布
                const members = await getData(urlParams.memberdistribution, params);
                this.setState({ members });
            } catch (error) {
                console.log(error);
                this.handleErrorBase();
            } finally {
                this.setState({
                    loading: false
                });
            }
        });
    };
    render() {
        const {
            surveyFont,
            surveyTable,
            surveyChart,
            cityMapData,
            cityTableData,
            tendency,
            unit,
            saleFont,
            regionSales,
            departSale,
            catSales,
            cat1Sales,
            regionCate2Data,
            regionCate34Data,
            heatMapData,
            memberFontInfo,
            memberReData,
            memberType,
            branchDistributionTitle,
            selectorData0,
            selectorData1,
            selectorData2,
            selectorData3,
            selectorData4,
            members,
            cat2Member,
            buyFrequency,
            buyMemberFreq,
            t20cate3,
            top10cat,
            top6Cat3Member,
            regionAndCat34,
            regionCatTitle,
            regionCatMemberTitle,
            loading
        } = this.state;
        const { saleRadio } = this.props.offlineAnalysis;
        // console.log('regionCate2Data', regionCate2Data);
        return (
            <div className="offline">
                {loading ? (
                    <div
                        className="loading-box"
                        onWheel={e => {
                            e.preventDefault();
                        }}
                    >
                        <Spin tip="数据加载中..." />
                    </div>
                ) : (
                    ''
                )}
                <Header queryData={this.queryData} />
                <div className="survey">
                    <h3 className="h3">整体概况</h3>
                    <SurveyFont surveyFont={surveyFont} unit={unit} />
                    <div className="situation group">
                        <h3 className="h4">整体情况</h3>
                        <SurveyTablePie surveyTable={surveyTable} surveyChart={surveyChart} unit={unit} />
                    </div>
                    <CitySale cityMapData={cityMapData} cityTableData={cityTableData} unit={unit} />
                    <div className="sale-member group">
                        <div className="query-data">
                            <span className="name">销售与会员趋势</span>
                            <Radios data={saleMember} changeTimeType={this.changeTimeType} value={saleRadio} />
                        </div>
                        <SaleMember saleRadio={saleRadio} tendency={tendency} />
                    </div>
                </div>
                <div className="sale">
                    <h3 className="h3">销售分析</h3>
                    <SaleFont saleFont={saleFont} unit={unit} />
                    <div className="group">
                        <h3 className="h4">各大区销售分布</h3>
                        <RegionSale unit={unit} regionSales={regionSales} />
                        <div className="depart">
                            <div className="query-data dis clear">
                                <div className="name fl">各分部销售情况</div>
                                <Selectors onSearch={this.handleSelect} selectData={selectorData0} />
                            </div>
                            <DepartSale title={branchDistributionTitle} departSale={departSale} />
                        </div>
                    </div>
                    <div className="cate group">
                        <h3 className="h4">大区-品类销售</h3>
                        <CategorySale catSales={catSales} cat1Sales={cat1Sales} />
                    </div>
                    <div className="cate2-bar group">
                        <div className="region-cate query-data ">
                            <Selectors selectData={selectorData1} />
                        </div>
                        <RegionCate2 type={''} title="各大区重点二级品类销售" regionCateData={regionCate2Data} />
                        <div className="query-data dis clear">
                            <div className="name fl">三四级品类</div>
                            <Selectors onSearch={this.handleSelect} selectData={selectorData2} />
                        </div>
                        <RegionCate2
                            regionAndCat34={regionAndCat34}
                            type={this.state.selectorParams1.region_name}
                            title={regionCatTitle}
                            regionCateData={regionCate34Data}
                        />
                        <HeatMap unit={unit} heatMapData={heatMapData} />
                    </div>
                </div>
                <div className="member">
                    <h3 className="h3">购买会员分析</h3>
                    <MemberFont type="新会员" fontData={memberFontInfo} unit={unit} />
                    <div className="group r-m">
                        <RegionMember data={memberReData} />
                    </div>
                    <div className="mem group">
                        <div className="query-data">
                            <span className="name">大区-品类的购买会员分布</span>
                            <span className="m">新老会员</span>
                            <Radios data={cateMember} changeTimeType={this.changeMemType} value={memberType} />
                        </div>
                        <div className="region-cate query-data ">
                            <Selectors selectData={selectorData3} />
                        </div>
                        <Members cat2Member={cat2Member} member={members} />
                        <div className="query-data dis clear">
                            <div className="name fl">三四级品类</div>
                            <Selectors onSearch={this.handleSelect} selectData={selectorData4} />
                        </div>
                        <TOP10Cat
                            title={regionCatMemberTitle}
                            type={this.state.selectorParams2.region_name}
                            data={top10cat}
                            top6Cat={top6Cat3Member}
                        />
                    </div>
                    <div className="group frequency">
                        <h3 className="h4">购买频次</h3>
                        <PurchaseTrend buy={buyFrequency} buyFreq={buyMemberFreq} />
                        <T20Cate3 data={t20cate3} />
                    </div>
                </div>
                <div className="pri-btn">
                    <Button type="primary">导出报告</Button>
                    <Button className="btn" type="primary">
                        导出数据
                    </Button>
                </div>
            </div>
        );
    }
}

offlineAnalysis.propTypes = {
    offlineAnalysis: PropTypes.object,
    change_saleRadio: PropTypes.func
};
export default offlineAnalysis;

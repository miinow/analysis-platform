// 销售渠道
const channelData = [{ name: '不限', value: '10,16' }, { name: '来购', value: '16' }, { name: '金力', value: '10' }];
// 销售与会员趋势
const saleMember = [
    { name: '按月', value: 'month' },
    { name: '按天', value: 'day' },
    { name: '按周', value: 'week' },
    { name: '按年', value: 'year' }
];
// 大区-品类的购买会员分布
const cateMember = [{ name: '不限', value: '' }, { name: '新会员', value: '1' }, { name: '老会员', value: '0' }];
// 各分部销售情况
const departSelect = [
    {
        params: 'region_name',
        name: '大区筛选',
        value: undefined,
        data: [{ label: '华北大区', value: '华北大区' }, { label: '西部大区', value: '西部大区' }]
    },
    {
        params: 'branch_name_1',
        name: '一级分部筛选',
        value: undefined,
        data: [{ label: '华北大区', value: '华北大区' }, { label: '西部大区', value: '西部大区' }]
    },
    {
        params: 'branch_name_2',
        name: '二级分部筛选',
        value: undefined,
        data: [{ label: '华北大区', value: '华北大区' }, { label: '西部大区', value: '西部大区' }]
    }
];
const xyName = {
    yTitle1: '订单量/万',
    yTitle2: '销售额/万'
};
const TOP10XYName = {
    yTitle1: '会员数/万',
    yTitle2: '人均购买件数'
};
const pie12Color = [
    '#E53936',
    '#D91A60',
    '#8F23AA',
    '#7F46F2',
    '#4054EB',
    '#17A4F3',
    '#059BE5',
    '#03ACC1',
    '#009688',
    '#44A047',
    '#C0CA33',
    '#FDD835'
];
const pitCateColor = [['#9C5DFD', '#0B74F6'], ['#FE4978 ', '#F66035']];
const pieCate1Color = [['#00B2E4', '#64F3F9'], ['#F6EB54 ', '#F5AF61'], ['#A03DF4', '#BF70F5'], ['#F36C9E', '#E73A72']];
const urlParams = {
    description: 'service-mercury/overview/description', // 整体概况 文字描述
    offlineSales: 'service-mercury/overview/offline_sales', // 整体概况 线下整体销售情况
    channelRatio: 'service-mercury/overview/sales_channel_ratio', // 整体概况 线下各渠道销售额占比
    distribution: 'service-mercury/overview/city_sales_distribution', // 整体概况 城市销售分布
    citySalesLevel: 'service-mercury/overview/city_sales_level', // 整体概况 不同城市等级的销售情况
    tendency: 'service-mercury/overview/tendency', // 整体概况 销售趋势/购买会员趋势（暂定一个接口）

    overview: 'service-mercury/salesAnalysis/overview', // 销售分析 文字描述
    regionDistribution: 'service-mercury/salesAnalysis/regionDistribution', // 销售分析 大区整体销售/各大区销售占比
    branchDistribution: 'service-mercury/salesAnalysis/branchDistribution', // 销售分析 各分部的销售情况
    cat1SalseDistribution1: 'service-mercury/salesAnalysis/cat1SalesDistribution1', // 销售分析 销售额分布
    cat1SalesDistribution2: 'service-mercury/salesAnalysis/cat1SalesDistribution2', // 销售分析 一级品类销售分布
    keyCat2SalesDistribution: 'service-mercury/salesAnalysis/keyCat2SalesDistribution', // 销售分析 各大区重点二级品类销售
    cat34WithoutRegion: 'service-mercury/salesAnalysis/cat34WithoutRegion', // 销售分析 三四级品类----各大区top6重点三级品类（不选大区）
    cat34WithRegion: 'service-mercury/salesAnalysis/cat34WithRegion', // 销售分析 三四级品类----各大区top6重点三级品类（选择大区）
    brandTop10: 'service-mercury/salesAnalysis/brandTop10', // 销售分析 热力图 三四级品类----top10重点品牌各大区销售

    overviewMember: 'service-mercury/memberanalysis/overview', // 会员分析 描述
    selectdistrictmember: 'service-mercury/memberanalysis/selectdistrictmember', // 各大区的购买会员量
    memberdistribution: 'service-mercury/memberanalysis/memberdistribution', // 会员量分布
    secondcategorymember: 'service-mercury/memberanalysis/secondcategorymember', // 重点二级品类会员分布
    selectmemberbuyfrequency: 'service-mercury/memberanalysis/selectmemberbuyfrequency', // 会员的购买频次分布
    selectdifferentbuyfrequency: 'service-mercury/memberanalysis/selectdifferentbuyfrequency', // 不同购买频次的会员量分布
    selecttop20cat3member: 'service-mercury/memberanalysis/selecttop20cat3member', // 购买频次top20的三级品类分布
    selecttop10categorymember: 'service-mercury/memberanalysis/selecttop10categorymember', // Top10品类的购买会员数及人均购买件数
    selecttop6cat3member: 'service-mercury/memberanalysis/selecttop6cat3member' // 各大区Top6重点三级品类会员量
};
export {
    channelData,
    saleMember,
    departSelect,
    xyName,
    pie12Color,
    pitCateColor,
    pieCate1Color,
    cateMember,
    TOP10XYName,
    urlParams
};

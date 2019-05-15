export const lineOption = {
    title: {
        text: '单折线图',
        x: 'center',
        textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal',
        right: 'left',
        data: ['购买频次'],
        show: true
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            type: 'line',
            data: []
        }
    ]
};

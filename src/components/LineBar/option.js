/**
 * Created by paomianbei on 2019/2/19.
 */

export const lineBarOption = {
    title: {
        text: '',
        left: 'center',
        top: -2,
        textStyle: {
            color: '#DFEAFC',
            fontSize: 14,
            fontWeight: 'normal'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    color: ['#29AFD7', '#FD705A', '#FE454C', '#F35DFB', '#E53936', '#FE6521'],
    grid: {
        top: '25%',
        left: '3%',
        right: '3%',
        bottom: '2%',
        containLabel: true
    },
    legend: {
        right: 0,
        top: 18,
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 20,
        textStyle: {
            fontSize: 14,
            color: '#DFEAFC'
        },
        data: []
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#DFEAFC'
            },
            data: [],
            axisPointer: {
                type: 'shadow'
            }
            //  boundaryGap: false
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '',
            nameTextStyle: {
                color: '#DFEAFC'
            },
            axisLabel: {
                color: '#DFEAFC'
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    width: 0.3
                }
            }
        },
        {
            type: 'value',
            name: '',
            nameTextStyle: {
                color: '#DFEAFC'
            },
            axisLabel: {
                color: '#DFEAFC'
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false,
                lineStyle: {
                    width: 0.3
                }
            }
        }
    ],
    series: []
};

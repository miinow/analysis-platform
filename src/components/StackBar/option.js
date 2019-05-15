/**
 * Created by paomianbei on 2019/2/19.
 */
export const stackBarOption = {
    title: {
        text: '',
        left: '',
        top: -5,
        textStyle: {
            color: '#DFEAFC',
            fontSize: 16,
            fontWeight: 'normal'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
        // position: (point, params, dom, rect, size) => {
        //    const obj = { top: 60, left: +point[0] - 20 };
        //    return obj;
        // }
    },
    color: ['#1A7EC6', '#03ACC1', '#44A047', '#C0CA33', '#E53936', '#FE6521'],
    //  color: ['#1E7DDE ', '#29C7EC ', '#FD705A '],
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
    grid: {
        top: '25%',
        left: '3%',
        right: '3%',
        bottom: '1%',
        containLabel: true
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
            data: []
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '',
            nameTextStyle: {
                color: '#DFEAFC'
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    width: 0.3
                }
            },
            axisLabel: {
                color: '#DFEAFC'
            }
        }
    ],
    series: []
};

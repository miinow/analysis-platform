const option = {
    title: {
        text: 'iphone销量',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        show: false,
        orient: 'vertical',
        left: 'left',
        data: ['订单量/万', '销售额']
    },
    visualMap: {
        show: false,
        min: 0,
        max: 2500,
        left: 'left',
        top: 'bottom',
        inRange: {
            color: ['#defeff', '#026fdd']
        },
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true
    },
    toolbox: {
        show: false,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    series: [
        {
            name: '订单量/万',
            type: 'map',
            mapType: 'china',
            roam: true,
            top: 10,
            bottom: 10,
            scaleLimit: {
                min: 1,
                max: 8
            },
            label: {
                normal: {
                    show: true,
                    color: '#8C4615'
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#FB5459'
                },
                emphasis: {
                    areaColor: '#dccc2f'
                }
            },
            data: []
        }
    ]
};
export default option;

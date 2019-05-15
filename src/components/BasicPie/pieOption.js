export const pieOption = {
    title: {
        text: '某站点用户访问来源',
        x: 'center',
        textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
        }
    },
    color: ['#FB5459', '#925FFD '],
    tooltip: {
        trigger: 'item',
        // formatter: "{a} <br/>{b} : {c} ({d}%)"
        formatter: '{a} <br/>{b} : {c} ({d}%)'
        // formatter: "{b} : {c}万; {d}%"
    },
    legend: {
        icon: 'circle',
        itemWidth: 8, // 设置宽度
        itemHeight: 8, // 设置高度
        itemGap: 20, // 设置间距
        orient: 'horizontal',
        right: 'left',
        data: ['来购', '金立']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            // roseType: 'radius',
            // radius: '55%',
            center: ['50%', '60%'],
            label: {},
            labelLine: {},
            data: [
                {
                    value: 2154,
                    name: '来购',
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
                {
                    value: 3854,
                    name: '金立',
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    ]
};

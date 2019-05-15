/**
 * Created by paomianbei on 2019/2/21.
 */
import React, { Component } from 'react';
import { toThousands, percentConversion, isUP, thousandSeparates } from '../../utils/utils';
import { SvgIcon } from '../../components';

export const OfflineSalesColumns = [
    {
        title: '时间',
        dataIndex: 'time'
    },
    {
        title: '门店数',
        dataIndex: 'store_cnt',
        render: (text, record) => {
            const { propClass, value } = isUP(record.store_cnt);
            const timeFlag = record.time === '环比' || record.time === '同比' || record.time === '对比';
            return (
                <span>
                    {timeFlag && <SvgIcon iconClass="arrow" propClass={propClass} />}
                    {timeFlag ? percentConversion(+value) : thousandSeparates(+value)}
                </span>
            );
        }
    },
    {
        title: '购买会员数/万',
        dataIndex: 'buy_user',
        render: (text, record) => {
            const { propClass, value } = isUP(record.buy_user);
            const timeFlag = record.time === '环比' || record.time === '同比' || record.time === '对比';
            return (
                <span>
                    {timeFlag && <SvgIcon iconClass="arrow" propClass={propClass} />}
                    {timeFlag ? percentConversion(+value) : thousandSeparates(+value)}
                </span>
            );
        }
    },
    {
        title: '订单量/万',
        dataIndex: 'order_cnt',
        render: (text, record) => {
            const { propClass, value } = isUP(record.order_cnt);
            const timeFlag = record.time === '环比' || record.time === '同比' || record.time === '对比';
            return (
                <span>
                    {timeFlag && <SvgIcon iconClass="arrow" propClass={propClass} />}
                    {timeFlag ? percentConversion(+value) : thousandSeparates(+value)}
                </span>
            );
        }
    },
    {
        title: '销售额/万',
        dataIndex: 'sale_total_amount',
        render: (text, record) => {
            const { propClass, value } = isUP(record.sale_total_amount);
            const timeFlag = record.time === '环比' || record.time === '同比' || record.time === '对比';
            return (
                <span>
                    {timeFlag && <SvgIcon iconClass="arrow" propClass={propClass} />}
                    {timeFlag ? percentConversion(+value) : thousandSeparates(+value)}
                </span>
            );
        }
    },
    {
        title: '退款订单占比',
        dataIndex: 'refund_order_cnt',
        render: (text, record) => {
            const { propClass, value } = isUP(record.refund_order_cnt);
            const timeFlag = record.time === '环比' || record.time === '同比' || record.time === '对比';
            return (
                <span>
                    {timeFlag && <SvgIcon iconClass="arrow" propClass={propClass} />}
                    {percentConversion(+value)}
                </span>
            );
        }
    },
    {
        title: '退款销售占比',
        dataIndex: 'refund_order_amount',
        render: (text, record) => {
            const { propClass, value } = isUP(record.refund_order_amount);
            const timeFlag = record.time === '环比' || record.time === '同比' || record.time === '对比';
            return (
                <span>
                    {timeFlag && <SvgIcon iconClass="arrow" propClass={propClass} />}
                    {percentConversion(+value)}
                </span>
            );
        }
    }
];
export const CitySalesColumns = ratio => {
    const salesColumns = [
        {
            title: '城市等级',
            dataIndex: 'city_level'
        },
        {
            title: '订单量/万',
            dataIndex: 'order_cnt',
            render: (text, record) => {
                const { value } = isUP(record.order_cnt);
                return <span>{thousandSeparates(+value)}</span>;
            }
        },
        {
            title: ratio,
            dataIndex: 'order_ratio',
            render: (text, record) => {
                const { propClass, value } = isUP(record.order_ratio);
                return (
                    <span>
                        <SvgIcon iconClass="arrow" propClass={propClass} />
                        {percentConversion(+value)}
                    </span>
                );
            }
        },
        {
            title: '销售额/万',
            dataIndex: 'sale_amount',
            render: (text, record) => {
                const { value } = isUP(record.sale_amount);
                return <span>{thousandSeparates(+value)}</span>;
            }
        },
        {
            title: ratio,
            dataIndex: 'amout_ratio',
            render: (text, record) => {
                const { propClass, value } = isUP(record.amout_ratio);
                return (
                    <span>
                        {' '}
                        <SvgIcon iconClass="arrow" propClass={propClass} />
                        {percentConversion(+value)}
                    </span>
                );
            }
        },
        {
            title: '会员量/万',
            dataIndex: 'buy_user',
            render: (text, record) => {
                const { value } = isUP(record.buy_user);
                return <span>{thousandSeparates(+value)}</span>;
            }
        },
        {
            title: ratio,
            dataIndex: 'user_ratio',
            render: (text, record) => {
                const { propClass, value } = isUP(record.user_ratio);
                return (
                    <span>
                        <SvgIcon iconClass="arrow" propClass={propClass} />
                        {percentConversion(+value)}
                    </span>
                );
            }
        }
    ];

    return salesColumns;
};
export const RegionColumns = ratio => {
    const regionColumns = [
        {
            title: '大区名称',
            dataIndex: 'region_name'
        },
        {
            title: '门店数',
            dataIndex: 'store_cnt',
            render: (text, record) => {
                const { value } = isUP(record.store_cnt);
                return <span>{thousandSeparates(+value)}</span>;
            }
        },
        {
            title: ratio,
            dataIndex: 'store_cnt_ratio',
            render: (text, record) => {
                const { propClass, value } = isUP(record.store_cnt_ratio);
                return (
                    <span>
                        <SvgIcon iconClass="arrow" propClass={propClass} />
                        {percentConversion(+value)}
                    </span>
                );
            }
        },
        {
            title: '订单量/万',
            dataIndex: 'order_cnt',
            render: (text, record) => {
                const { value } = isUP(record.order_cnt);
                return <span>{thousandSeparates(+value)}</span>;
            }
        },
        {
            title: ratio,
            dataIndex: 'order_cnt_ratio',
            render: (text, record) => {
                const { propClass, value } = isUP(record.order_cnt_ratio);
                return (
                    <span>
                        <SvgIcon iconClass="arrow" propClass={propClass} />
                        {percentConversion(+value)}
                    </span>
                );
            }
        },
        {
            title: '销售额/万',
            dataIndex: 'sale_total_amount',
            render: (text, record) => {
                const { value } = isUP(record.sale_total_amount);
                return <span>{thousandSeparates(+value)}</span>;
            }
        },
        {
            title: ratio,
            dataIndex: 'sale_total_amount_ratio',
            render: (text, record) => {
                const { propClass, value } = isUP(record.sale_total_amount_ratio);
                return (
                    <span>
                        {' '}
                        <SvgIcon iconClass="arrow" propClass={propClass} />
                        {percentConversion(+value)}
                    </span>
                );
            }
        },
        {
            title: '购买会员量/万',
            dataIndex: 'buy_user_cnt',
            render: (text, record) => {
                const { value } = isUP(record.buy_user_cnt);
                return <span>{thousandSeparates(+value)}</span>;
            }
        },
        {
            title: ratio,
            dataIndex: 'buy_user_cnt_ratio',
            render: (text, record) => {
                const { propClass, value } = isUP(record.buy_user_cnt_ratio);
                return (
                    <span>
                        <SvgIcon iconClass="arrow" propClass={propClass} />
                        {percentConversion(+value)}
                    </span>
                );
            }
        },
        {
            title: '退款订单占比',
            dataIndex: 'refund_order_cnt_rate',
            render: (text, record) => {
                const { propClass, value } = isUP(record.refund_order_cnt_rate);
                return (
                    <span>
                        {record.time === '环比' && <SvgIcon iconClass="arrow" propClass={propClass} />}
                        {percentConversion(+value)}
                    </span>
                );
            }
        },
        {
            title: ratio,
            dataIndex: 'refund_order_cnt_rate_ratio',
            render: (text, record) => {
                const { propClass, value } = isUP(record.refund_order_amount_ratio);
                return (
                    <span>
                        <SvgIcon iconClass="arrow" propClass={propClass} />
                        {percentConversion(+value)}
                    </span>
                );
            }
        },
        {
            title: '退款销售占比',
            dataIndex: 'refund_order_amount_rate',
            render: (text, record) => {
                const { propClass, value } = isUP(record.refund_order_amount_rate);
                return (
                    <span>
                        {record.time === '环比' && <SvgIcon iconClass="arrow" propClass={propClass} />}
                        {percentConversion(+value)}
                    </span>
                );
            }
        },
        {
            title: ratio,
            dataIndex: 'refund_order_amount_ratio',
            render: (text, record) => {
                const { propClass, value } = isUP(record.refund_order_amount_ratio);
                return (
                    <span>
                        <SvgIcon iconClass="arrow" propClass={propClass} />
                        {percentConversion(+value)}
                    </span>
                );
            }
        }
    ];

    return regionColumns;
};
export const DifferentBuyFrequency = [
    {
        title: '分类',
        dataIndex: 'name'
    },
    {
        title: '1次',
        dataIndex: 'buy1',
        render: (text, record) => {
            const { value } = isUP(record.buy1);
            return <span>{toThousands(+value)}</span>;
        }
    },
    {
        title: '2次',
        dataIndex: 'buy2',
        render: (text, record) => {
            const { value } = isUP(record.buy2);
            return <span>{toThousands(+value)}</span>;
        }
    },
    {
        title: '3次',
        dataIndex: 'buy3',
        render: (text, record) => {
            const { value } = isUP(record.buy3);
            return <span>{toThousands(+value)}</span>;
        }
    },
    {
        title: '3次以上',
        dataIndex: 'buy4',
        render: (text, record) => {
            const { value } = isUP(record.buy4);
            return <span>{toThousands(+value)}</span>;
        }
    }
];

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isUpOrDown, toThousands } from '../../../../utils/utils';
import _ from 'lodash';

class SurveyFont extends PureComponent {
    constructor() {
        super();
        this.state = {
            survey: {}
        };
    }
    componentDidMount() {
        this.handleData(this.props.surveyFont);
    }
    componentWillReceiveProps(nextProps) {
        this.handleData(nextProps.surveyFont);
    }
    handleData = surveyFont => {
        // 0=>同比 1=>环比 2=>对比时间
        if (Object.keys(surveyFont).length > 0) {
            const {
                region_cnt,
                store_cnt,
                order_cnt,
                sale_total_amount,
                city_top,
                order_ratio,
                sale_ratio
            } = surveyFont;
            surveyFont.region_cnt = toThousands(region_cnt);
            surveyFont.store_cnt = toThousands(store_cnt);
            surveyFont.order_cnt = toThousands(order_cnt);
            surveyFont.sale_total_amount = toThousands(sale_total_amount);
            surveyFont.city_top = city_top && city_top instanceof Array && city_top.join('，');
            if (+order_ratio === 0) {
                surveyFont.order_ratio = '持平';
            } else if (isUpOrDown(order_ratio).flag === 1) {
                surveyFont.order_ratio = `增长${isUpOrDown(order_ratio).value}`;
            } else if (isUpOrDown(order_ratio).flag === 2) {
                surveyFont.order_ratio = `下降${isUpOrDown(order_ratio).value}`;
            }
            if (+sale_ratio === 0) {
                surveyFont.sale_ratio = '持平';
            } else if (isUpOrDown(sale_ratio).flag === 1) {
                surveyFont.sale_ratio = `增长${isUpOrDown(sale_ratio).value}`;
            } else if (isUpOrDown(sale_ratio).flag === 2) {
                surveyFont.sale_ratio = `下降${isUpOrDown(sale_ratio).value}`;
            }
        }
        this.setState({ survey: surveyFont });
    };

    render() {
        const { unit } = this.props;
        const { survey } = this.state;
        const { region_cnt, store_cnt, order_cnt, sale_total_amount, city_top, order_ratio, sale_ratio } = survey;
        return (
            <div className="font-info">
                <div className="name">
                    线下大区共<span>{region_cnt}</span>个，门店数<span>{store_cnt}</span>个，订单量
                    <span>{order_cnt}</span>万， {unit}
                    <span>{order_ratio}</span>，销售额<span>{sale_total_amount}</span>万，{unit}
                    <span>{sale_ratio}</span>；
                </div>
                <ul>
                    <li>• 从城市来看，销售额主要集中在{city_top}城市；</li>
                </ul>
            </div>
        );
    }
}

SurveyFont.propTypes = {
    surveyFont: PropTypes.object,
    unit: PropTypes.string
};
export default SurveyFont;

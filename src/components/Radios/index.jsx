import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import './radio.scss';

const RadioGroup = Radio.Group;

class Radios extends PureComponent {
    render() {
        const { name, data, value, changeTimeType } = this.props;
        return (
            <span className="radios">
                {name && <span className="name">{name}</span>}
                <RadioGroup onChange={changeTimeType} value={value}>
                    {data &&
                        data.length > 0 &&
                        data.map(item => (
                            <Radio key={item.value} value={item.value}>
                                {item.name}
                            </Radio>
                        ))}
                </RadioGroup>
            </span>
        );
    }
}
Radios.propTypes = {
    name: PropTypes.string,
    data: PropTypes.array,
    value: PropTypes.string,
    changeTimeType: PropTypes.func
};
export default Radios;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

class Selector extends PureComponent {
    render() {
        const { name, data, val, changeSelector } = this.props;
        return (
            <span className="selector">
                {name && <span className="name">{name}</span>}
                <Select
                    placeholder="不限"
                    onChange={changeSelector && changeSelector instanceof Function && changeSelector}
                    value={val && val}
                    disabled={!data.length}
                >
                    {data &&
                        data.length > 0 &&
                        data.map(item => (
                            <Option key={item.value} value={item.value}>
                                {item.label}
                            </Option>
                        ))}
                </Select>
            </span>
        );
    }
}

Selector.propTypes = {
    name: PropTypes.string,
    data: PropTypes.array,
    val: PropTypes.string,
    changeSelector: PropTypes.any
};
export default Selector;

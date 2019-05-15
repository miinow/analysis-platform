import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select, Form, Button } from 'antd';
import './selector.scss';
import Selector from './Selector';

const { Option } = Select;

class Selectors extends PureComponent {
    handleCommit = _ => {
        this.props.form.validateFields((err, values) => {
            !err && this.props.onSearch(values, this.props.form);
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { selectData, searchBtn } = this.props;
        return (
            <Form layout="inline" className="selectors">
                {selectData &&
                    selectData.length > 0 &&
                    selectData.map((item, index) => {
                        const { name, value, data, changeSelector, params } = item;
                        return (
                            <Form.Item label={name} key={index}>
                                {getFieldDecorator(params)(
                                    <Selector val={value} data={data} changeSelector={changeSelector} />
                                )}
                            </Form.Item>
                        );
                    })}
                {searchBtn && (
                    <Form.Item>
                        <Button className="query" onClick={this.handleCommit} type="primary">
                            查询
                        </Button>
                    </Form.Item>
                )}
            </Form>
        );
    }
}

Selectors.defaultProps = {
    searchBtn: false
};

Selectors.propTypes = {
    selectData: PropTypes.array,
    onSearch: PropTypes.func,
    form: PropTypes.object,
    searchBtn: PropTypes.bool
};
const SelectorsForm = Form.create()(Selectors);
export default SelectorsForm;

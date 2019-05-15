import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Button, message } from 'antd';
import axios from '../../api/instance';

import './Login.scss';

const { Item } = Form;

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.setBase);
        this.setBase();
    }

    setBase = () => {
        const bw = 'width',
            bh = 'height',
            tw = 'offsetWidth',
            th = 'offsetHeight',
            baseObject = { width: 1024 * 1.5, height: 768 * 1.5 },
            rootEl = document.documentElement || document.body,
            baseRatio = baseObject[bw] / baseObject[bh],
            base = baseObject[bw],
            terminalRatio = rootEl[tw] / rootEl[th];
        let terminal = rootEl[tw];
        if (terminalRatio > baseRatio) {
            terminal = rootEl[th] * baseRatio;
        }
        const rem = 100 * (terminal / base);
        this.mainEl.style.fontSize = rem + 'px';
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // 调用登录接口
                try {
                    const res = await axios.authInstance.post('/api/auth/login', values);
                    if (+res.code === 200) {
                        this.props.history.push('/');
                    } else {
                        message.error(res.msg);
                    }
                } catch (error) {
                    console.log('error', error);
                    message.error('登录失败，系统错误');
                }
            }
        });
    };

    render() {
        const { isLoading } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login-wrapper">
                <div
                    className="login-main"
                    ref={node => {
                        this.mainEl = node;
                    }}
                >
                    <div className="login-logo">
                        <img src={require('../../assets/image/ring.png')} alt="" className="ring-img" />
                        <img src={require('../../assets/image/title.png')} alt="" className="title-img" />
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名!'
                                    }
                                ]
                            })(<Input placeholder="用户名" />)}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入密码!'
                                    }
                                ]
                            })(<Input placeholder="密码" type="password" autoComplete="off" />)}
                        </Item>
                        <Item>
                            <Button htmlType="submit" type="primary" loading={isLoading} className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </div>
                <div className="login-footer">© 国美大数据中心</div>
            </div>
        );
    }
}

Login.propTypes = {
    form: PropTypes.any,
    history: PropTypes.any
};

export default Form.create()(withRouter(Login));

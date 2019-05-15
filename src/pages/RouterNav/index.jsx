import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Layout, Menu, message } from 'antd';
import { navData } from '../../config';
import { SvgIcon } from '../../components';
import Cookies from 'js-cookie';
import axios from '../../api/instance';

import './RouterNav.scss';

const avatar = require('../../assets/image/avatar.png');

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

class RouterNav extends Component {
    route = [];
    routeMap = [];

    constructor(props) {
        super(props);

        this.state = {
            mode: 'inline'
        };
    }

    componentWillMount() {
        this.loginAuth();
        this.menu = this.generateMenu(navData);
        this.generateRoute(navData);
    }

    loginAuth = async () => {
        // 检查登录状态
        if (Cookies.get('username')) {
            try {
                const res = await axios.authInstance.get('/api/auth/status');
                if (+res.code !== 200) {
                    Cookies.remove('username');
                    this.props.history.replace('/login');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            // this.props.history.replace('/login');
        }
    };

    generateMenu = data => {
        return data.map(item => {
            if (item.subs) {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <SvgIcon iconClass={item.icon} propClass="menu-icon menu-icon-animation" />
                                <span className="nav-text">{item.title}</span>
                            </span>
                        }
                    >
                        {this.generateMenu(item.subs)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item
                        key={item.key}
                        onClick={e => {
                            this.changeRoute(item.path, e);
                        }}
                    >
                        {item.icon ? (
                            <span>
                                <SvgIcon iconClass={item.icon} propClass="menu-icon menu-icon-animation" />
                                <span>{item.title}</span>
                            </span>
                        ) : (
                            <>
                                <span className="sub-text">{item.title}</span>
                            </>
                        )}
                    </Menu.Item>
                );
            }
        });
    };

    generateRoute = (data, parentKey) => {
        data.forEach(item => {
            if (item.subs) {
                this.generateRoute(item.subs, item.key);
            } else if (item.component) {
                this.route.push(<Route exact path={item.path} component={item.component} key={item.key} />);
                this.routeMap.push({
                    openKey: parentKey,
                    path: item.path,
                    key: item.key,
                    redirect: item.redirect
                });
                if (item.redirect) {
                    this.route.push(<Redirect exact from={item.redirect} to={item.path} key={item.key} />);
                }
            }
        });
    };

    getDefaultKey = () => {
        const { location } = this.props;
        let keyObj = {};
        this.routeMap.find(item => {
            if (item.path === location.pathname || item.redirect === location.pathname) {
                keyObj = { ...item };
                return true;
            }
            return false;
        });
        return keyObj;
    };

    changeRoute = path => {
        this.props.history.push({ pathname: path });
    };

    logout = async () => {
        try {
            const res = await axios.authInstance.get('/api/auth/logout');
            if (+res.code === 200) {
                const { history } = this.props;
                history.replace('/login');
            } else {
                message.error('登出失败，系统错误');
            }
        } catch (error) {
            console.log(error);
            message.error('登出失败，系统错误');
        }
    };

    render() {
        const username = Cookies.get('username');
        const defaultKeyObj = this.getDefaultKey();
        return (
            <div className="router-nav-wrapper">
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                        <div className="menu-wrapper">
                            <div className="user-box">
                                <img src={avatar} alt="" />
                                <div>
                                    <span className="user-username">{username || 'username'}</span>
                                    <span className="user-logout" onClick={this.logout}>
                                        退出
                                    </span>
                                </div>
                            </div>
                            <Menu
                                theme="dark"
                                defaultOpenKeys={[defaultKeyObj.openKey]}
                                defaultSelectedKeys={[defaultKeyObj.key]}
                                mode={this.state.mode}
                            >
                                {this.menu}
                            </Menu>
                        </div>
                    </Sider>
                    <Layout className="main-content-wrapper">
                        <Content>
                            <Switch>{this.route.map(item => item)}</Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>© 国美大数据中心</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

RouterNav.propTypes = {
    history: PropTypes.any,
    location: PropTypes.any
};

export default withRouter(RouterNav);

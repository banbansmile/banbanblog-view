
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Menu, Icon } from 'antd'
import ModList from './mod/modlist'
import AriticleList from './ariticle/ariticlelist'
import './style.css'
import AddAriticle from './ariticle/addariticle'
import AddAriticleCkEditor from './ariticle/addariticleckditor'
import BCKEditor from './ariticle/ckeditor'
//import App from './ariticle/App'
import TinyAriticleCkEditor from './ariticle/addAriticleTinyEditor';

const { SubMenu } = Menu;

export default class Manager extends React.Component {


    goToDest = (item) => {
        const { key } = item;
        const { history } = this.props;
        history.push(`/manager/${key}`)
        //browserHistory
        //window.location=`/manager/${key}`
    }

    render() {
        const { match } = this.props
        return (
            <div className="managerInfo" style={{ minHeight: 'calc(100vh - 250px)' }}>
                <div className="manager_left_right">
                    <div className="left">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['1', '11', '2', '3', '4']}
                            style={{ width: 256 }}
                            onClick={(item) => { this.goToDest(item) }}
                        >
                            <SubMenu
                                key="1"
                                title={
                                    <span>
                                        <Icon type="mail" />
                                        <span>Ariticle管理</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="12">Ariticle列表</Menu.Item>
                                <Menu.Item key="addariticle">Ariticle添加</Menu.Item>
                                <Menu.Item key="addckeditorariticle">CKAriticle添加</Menu.Item>
                                <Menu.Item key="tinyeditor">TinyEditor</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="11"
                                title={
                                    <span>
                                        <Icon type="mail" />
                                        <span>心情管理</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="mod">心情列表</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="2"
                                title={
                                    <span>
                                        <Icon type="appstore" />
                                        <span>留言管理</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="35">留言列表</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="4"
                                title={
                                    <span>
                                        <Icon type="setting" />
                                        <span>文章评论</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="93">评论列表</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="5"
                                title={
                                    <span>
                                        <Icon type="setting" />
                                        <span>标签管理</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="39">标签列表</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="54"
                                title={
                                    <span>
                                        <Icon type="setting" />
                                        <span>网站管理</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="49">数据备份</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                    <div className="right">
                        <HashRouter>
                            <Switch>
                                <Route exact path={`${match.url}/aaa`} component={AriticleList} />
                                <Route exact path={`${match.url}/addariticle`} component={AddAriticle} />
                                <Route exact path={`${match.url}/addckeditorariticle`} component={AddAriticleCkEditor} />
                                <Route exact path={`${match.url}/mod`} component={ModList} />
                                <Route exact path={`${match.url}/tinyeditor`} component={TinyAriticleCkEditor} />
                                <Route exact path={`${match.url}/ckeditor`} component={BCKEditor} />
                                {/* <Route exact path={`${match.url}/app`} component={App}/> */}
                                <Route component={AriticleList} />
                            </Switch>
                        </HashRouter>
                    </div>
                </div>
            </div>

        )
    }
}

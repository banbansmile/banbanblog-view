import React from 'react';
import './errorpage.css'

export default class Page404 extends React.Component {

    componentDidMount(){
        
        document.title='404 NotFound 当时一样雨'
    }

    render() {
        return (<div className="errorPage" style={{minHeight:'calc(100vh)'}}>
            <div className="errorContent">
                <h3>抱歉！页面无法访问……</h3>
                <p>页面链接可能已失效或被删除&nbsp;&nbsp;&nbsp;&nbsp;<a href="#/index">返回首页</a></p>
            </div>
        </div>);
    }

}
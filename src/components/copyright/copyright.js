import React from 'react'
import './style.css'

export default class CopyRight extends React.Component {


    render() {
        return (<div className="copyRight">
            <p>Copyright © 2020</p>
            <p>www.banbansmile.com All rights reserved. <a href="http://baian.miit.gov.cn" target="_blank" rel="noopener noreferrer">粤ICP备19161558号</a></p>
        </div>)
    }
}
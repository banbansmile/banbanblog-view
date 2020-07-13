import React from 'react';


export default class FriendLinks extends React.Component {

    render() {
        return (<ul>
            <li><a href="#/me" target="_blank" rel="noopener noreferrer">我的信息</a></li>
            <li><a href="http://www.zhihu.com" target="_blank" rel="noopener noreferrer">知乎</a></li>
            <li><a href="https://www.cnblogs.com/mingyueguli" target="_blank" rel="noopener noreferrer">当时一样雨园博客</a></li>
            <li><a href="https://blog.csdn.net/miaoge_miaoge" target="_blank" rel="noopener noreferrer">班班CSDN博客</a></li>
        </ul>)
    }

}
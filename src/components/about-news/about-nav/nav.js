import React from 'react';
import './nav.css'

export default class AboutNav extends React.Component {


    render() {
        return (
            <nav className="mynav">
                <ul>
                    <li className="ab"><a href="#/about" title="关于博主">关于博主</a></li>
                    <li className="sy"><a href="#/mode" title="心情随笔">心情随笔</a></li>
                    <li className="js"><a href="#/past" title="韶华追忆">韶华追忆</a></li>
                    <li className="msh"><a href="#/index" title="网站首页">网站首页</a></li>
                    <li className="ly"><a href="#/blogmessage" title="Blog留言">Blog留言</a></li>
                    <li className="ly"><a href="#/book" title="班班">班班书屋</a></li>
                </ul>
            </nav>
        )

    }

}
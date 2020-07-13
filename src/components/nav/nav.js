import React from 'react';
import Abutton from '../abutton/abutton'
import './nav.css'

export default class Nav extends React.Component{


    static defaultProps={
        currentId:-1
    }

 

    handleClick(menuId){
      

    }

    menu=[
        {title:'首页',link:'#/index',menuId:0},
        {title:'心情随笔',link:'#/mode',menuId:1},
        {title:'韶华追忆',link:'#/past',menuId:2},
        {title:'技术分享',link:'#/tech',menuId:3},
        {title:'个人归档',link:'#/person',menuId:4},
        // {title:'书屋',link:'#/book',menuId:5},
        {title:'博客留言',link:'#/blogmessage',menuId:6},
        {title:'关于我',link:'#/about',menuId:7}
    ];



    render(){
        
        return (<nav id="nav">
            <ul>
            {
                this.menu.map((menu,index) => (
                        <Abutton key={index} iscuttent={menu.menuId===this.props.currentId} title={menu.title} link={menu.link} menuId={index} handleClick={this.handleClick.bind(this)}></Abutton>
                ))
            }             
            </ul>
        </nav>)
    }
}


import React from 'react';
import './abutton.css';

export default class AButton extends React.Component{


    handleClick(menuId){
        this.props.handleClick(menuId);
    }

    render(){
        const {iscuttent, link, title,menuId} = this.props
        return (
            <a className={iscuttent? 'navcurrenta': 'nav'} href={link} onClick={this.handleClick.bind(this,menuId)}>
                {title}
            </a>
        )
    }

}




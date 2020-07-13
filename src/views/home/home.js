import React from 'react';



export default class Home extends React.Component {


    render() {
        return (
            <div style={{minHeight:'calc(100vh - 250px)'}}>
                <p>这里是Home页面-</p>
                <a href='#/detail'>去detail</a>
            </div>
        )
    }
}


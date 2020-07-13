import React from 'react';
import './style.css'

export default class BiaoBai1 extends React.Component {

    constructor(props) {
        super(props)
        this.state = { text: '' }
    }

    componentWillMount() {
        //let script = document.createElement("script");
        //script.setAttribute('src', 'biaobai1/function.js');
        //document.getElementsByTagName('head')[0].prepend(script);

        var text = this.getText();
        this.setState({ text });

        if (!this.timer) {
            this.timer = setInterval(() => {
                var text = this.getText();
                this.setState({ text });
            }, 1000)
        }
    }

    getText() {
        var a = new Date();
        var b = new Date(2016, 3, 4, 12, 3, 2);
        a = a.valueOf();
        b = b.valueOf();

        var c = parseInt((a - b) / 1000);

        var year = parseInt(c / 31536000);
        c = c % 31536000;
        //天数
        var day = parseInt(c / 86400);
        c = c % 86400;

        var hour = parseInt(c / 3600);
        c = c % 3600;

        var minute = parseInt(c / 60);
        c = c % 60;

        return year + '年' + day + '天' + hour + '小时' + minute + '分钟' + c + '秒'

        //c = new Date(c);
        //return (c.getFullYear() - 1970 + '年' + (c.getMonth()) + '月' + (c.getDate() - 1) + '天' + (c.getHours() - 8) + '小时' + c.getMinutes() + '分钟' + c.getSeconds() + '秒');
    }

    componentDidMount() {

        let script = document.createElement("script");
        script.setAttribute('src', 'biaobai1/write.js');
        document.getElementsByTagName('head')[0].appendChild(script);

    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }


    render() {

        const { text } = this.state;

        return (<div className="baibai1">


            <div className="mb-box">
                <div className="style11">
                    <h1>亲爱的小X:</h1>
                    <div className="style11_text">我只想说你是我一直以来想要找的那个人，茫茫人海中，相识了你，是一种缘份，只希望用我的真诚，
                    换取你的真情，多少人曾爱慕你年轻时的容颜，可是谁能承受岁月无情的变迁，我只希望在往后的日子里，陪伴着你走过漫长岁月，当你不再年轻，容颜褪去地时候，
                    我会在你耳边轻轻地说，当初，你很美，但如今，我更爱您饱经风霜的容颜。</div>
                    <p className="style11_myname">小M<br />2066-08-01</p>
                    <p className="love_time">我喜欢你已经：：<span>{text}</span></p>
                </div>
            </div>
        </div>)
    }

}
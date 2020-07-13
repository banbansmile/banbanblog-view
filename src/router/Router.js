import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import About from 'views/about/about';
import Index from 'views/index/index';
import Mode from 'views/mode/mode';
import Past from 'views/past/past';
import Tech from 'views/tech/tech';
import Person from 'views/person/person'
import Book from 'views/book/book';
import BlogMessage from 'views/blogmessage/blogmessage';
import AriticleDetail from 'views/ariticledetail/ariticledetail'
import Page404 from 'views/errorpage/page404'
import Manager from 'views/manager'
import Me from 'views/me/me'
import LoginPage from 'views/me/loginpage'
import ForgetPassword from 'views/me/forgetpassword'
//import {createBrowserHistory} from 'history';
import BiaoBai1 from 'views/biaobai/biaobai1';

export default class Router extends React.Component {

    render() {
        return (
            // <Router1 history={createBrowserHistory()}>
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route path="/exception/404" component={Page404} />
                    <Route path="/index" component={Index} />
                    <Route path="/mode" component={Mode} />
                    <Route path="/past" component={Past} />
                    <Route path="/tech" component={Tech} />
                    <Route path="/person" component={Person} />
                    <Route path="/book" component={Book} />
                    <Route path="/blogmessage" component={BlogMessage} />
                    <Route path="/about" component={About} />
                    <Route exact path="/ariticle/detail/:id" component={AriticleDetail} />
                    <Route path="/manager" component={Manager} />
                    <Route path="/me" component={Me}></Route>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/forgetpassword" component={ForgetPassword}/>
                    <Route path="/foryou" component={BiaoBai1}/>
                    <Route component={Page404} />
                </Switch>
            </HashRouter>
        )
    }
}

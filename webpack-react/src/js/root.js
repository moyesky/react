import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {hashHistory} from 'React-router';
import PCIndex from './components/pc-index';
import MobileIndex from './components/mobile-index';
import PCNewsDetails from './components/pc-news-details';
import PCUserCenter from './components/pc-usercenter';
import MobileUserCenter from './components/mobile-usercenter';
import MobileNewsDetails from './components/mobile-news-details';
import MediaQuery from 'react-responsive';
export default class Root extends React.Component{
    render(){
        return(
            <div>
                <MediaQuery query="(min-device-width: 1224px)">
                    <BrowserRouter history={hashHistory}>
                        <Switch>
                            <Route exact path="/" component={PCIndex}></Route>
                            <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
                            <Route path="/usercenter" component={PCUserCenter}></Route>
                        </Switch>
                    </BrowserRouter>
                </MediaQuery>

                <MediaQuery query="(max-width: 1224px)">
                    <BrowserRouter history={hashHistory}>
                        <Switch>
                            <Route path="/" component={MobileIndex}></Route>
                            <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
                            <Route path="/usercenter" component={MobileUserCenter}></Route>
                        </Switch>
                    </BrowserRouter>
                </MediaQuery>
                
            </div>
        );
    };
}

ReactDom.render(<Root/>,document.getElementById('mainContainer'));
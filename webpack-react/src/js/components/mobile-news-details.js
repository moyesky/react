import React from 'react';
import {Row, Col, BackTop, Form} from 'antd';
import MobileHeader from './mobile-header';
import MobileFooter from './mobile-footer';
import CommonComments from './common-comments';
export default class MobileNewsDetails extends React.Component{
    constructor(){
        super();
        this.state = {
            newsItem: ''
        }
    };
    componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({newsItem: json});
			document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
		})
	};
    creatMarkup(){
        return {__html: this.state.newsItem.pagecontent};
    };
    render(){
        return(
            <div id="mobileDetailsContainer">
                <MobileHeader></MobileHeader>
                <div className="ucmobileList">
                    <Row>
                        <Col span={24} className="container">
                            <div className="articleContainer" dangerouslySetInnerHTML={this.creatMarkup()}></div>
                            <CommonComments uniquekey={this.props.match.params.uniquekey}></CommonComments>
                            </Col>
                    </Row>
                    <MobileFooter></MobileFooter>
                    <BackTop/>
                </div>
            </div>
        );
    };
}
import React from 'react';
import MobileHeader from './mobile-header';
import MobileFooter from './mobile-footer';
import MobileList from './mobile-list';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
    Modal,
    Carousel
} from 'antd';
const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component{
    render(){
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        }
        return(
            <div>
                <MobileHeader></MobileHeader>
                <Tabs>
                    <TabPane tab="头条" key="1">
                        <div class="carousel">
                            <Carousel {...settings}>
                                <div><img src="./src/images/carousel_1.jpg"/></div>
                                <div><img src="./src/images/carousel_2.jpg"/></div>
                                <div><img src="./src/images/carousel_3.jpg"/></div>
                                <div><img src="./src/images/carousel_4.jpg"/></div>
                            </Carousel>
                        </div>
                        <MobileList count={16} type="top"></MobileList>
                    </TabPane>
                    <TabPane tab="国内" key="2">
                        <MobileList count={16} type="guonei"></MobileList>
                    </TabPane>
                    <TabPane tab="国际" key="3">
                        <MobileList count={16} type="guoji"></MobileList>
                    </TabPane>
                    <TabPane tab="娱乐" key="4">
                        <MobileList count={16} type="yule"></MobileList>
                    </TabPane>
                    <TabPane tab="体育" key="5">
                        <MobileList count={16} type="tiyu"></MobileList>
                    </TabPane>
                </Tabs>
                <MobileFooter></MobileFooter>
            </div>
        );
    }
}
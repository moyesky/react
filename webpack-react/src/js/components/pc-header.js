import React from 'react';
import {Row, Col, Tabs, message, Form, Menu, Icon, Input, Button, Checkbox, Modal} from 'antd';
import {Link} from 'react-router-dom';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
class PCHeader extends React.Component{
    constructor(){
        super();
        this.state = {
            current: 'top',
            modalVisibale: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid:0
        }
    };

    componentWillMount(){
        if(localStorage.userid!=''){
            this.setState({hasLogined: true});
            this.setState({userNickName: localStorage.userNickName,userid:localStorage.userid});
        }
    };
    setModalVisible (value){
        this.setState({modalVisibale: value})
    };
    handleClick(e){
        if(e.key == "register"){
            this.setModalVisible(true);
            this.setState({
                current: 'register'
            });
        }else{
            this.setState({
                current: e.key
            })
        }
    };
    //界面提交的时候
    handleSubmit(e){
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData =  this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password+"&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).
        then(response=>response.json()).then(json=>{
            this.setState({userNickName: json.NickUserName, userid: json.UserId});
            localStorage.userid = json.UserId;
            localStorage.userNickName = json.NickUserName;

        });
        if(this.state.action="login"){
            this.setState({hasLogined: true});
        }
        message.success("请求成功！");
        this.setModalVisible(false);
    };

    logout(){
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({hasLogined: false});
    }
    //注册登陆切换
    callback(key){
        if(key == 1){
            this.setState({
                action: 'login'
            });
        }else if(key == 2){
            this.setState({
                action: 'register'
            })
        }
    };
    render(){
        const {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined?
                        <Menu.Item key="logout" class="register">
                            <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                            &nbsp;&nbsp;
                            <Link target="_blank" to={`/usercenter`}>
                                <Button type="dashed" htmlType="button">个人中心</Button>
                            </Link>
                            &nbsp;&nbsp;
                            <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
                        </Menu.Item>
                        :
                        <Menu.Item key="register" class="register">
                            <Icon type="appstore"/>注册/登陆
                        </Menu.Item>
        return(
            <header>
                <Row>
                    <Col span={2}> </Col>
                    <Col span={4}>
                        <a href={`/`} class="logo">
                            <img src="/src/images/logo.png" alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col spam={16}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
                            <Menu.Item key="top"><Icon type="appstore"/>头条</Menu.Item>
                            <Menu.Item key="shehui"><Icon type="appstore"/>社会</Menu.Item>
                            <Menu.Item key="guonei"><Icon type="appstore"/>国内</Menu.Item>
                            <Menu.Item key="guoji"><Icon type="appstore"/>国际</Menu.Item>
                            <Menu.Item key="yule"><Icon type="appstore"/>娱乐</Menu.Item>
                            <Menu.Item key="tiyu"><Icon type="appstore"/>体育</Menu.Item>
                            <Menu.Item key="keji"><Icon type="appstore"/>科技</Menu.Item>
                            {userShow}
                        </Menu>
                        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisibale} 
                        onCancel = {()=>this.setModalVisible(false)}
                        onOk = {()=>this.setModalVisible(false)}
                        onText = "关闭">
                            <Tabs type="card" onChange={this.callback.bind(this)}>
                                <TabPane tab="登陆" key="1">
                                    <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="账户">
                                        {getFieldDecorator('userName', {
                                            rules: [{ required: true}]
                                        })(
                                            <Input placeholder="请输入您的账号"/>
                                        )}
                                        
                                    </FormItem>
                                    <FormItem label="密码">
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true}]
                                        })(
                                            <Input type="password" placeholder="请输入您的密码"/>
                                        )}
                                    </FormItem>
                                    <Button type="primary" htmlType="submit">登陆</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="账户">
                                        {getFieldDecorator('r_userName', {
                                            rules: [{ required: true}]
                                        })(
                                            <Input placeholder="请输入您的账号"/>
                                        )}
                                        
                                    </FormItem>
                                    <FormItem label="密码">
                                        {getFieldDecorator('r_password', {
                                            rules: [{ required: true}]
                                        })(
                                            <Input type="password" placeholder="请输入您的密码"/>
                                        )}
                                    </FormItem>
                                    <FormItem label="确认密码">
                                        {getFieldDecorator('r_confirmPassword', {
                                            rules: [{ required: true}]
                                        })(
                                            <Input type="password" placeholder="请再次输入您的密码"/>
                                        )}
                                    </FormItem>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>
                                    
                                </TabPane>

                                
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}> </Col>
                </Row>
            </header>
        );
    }
}
export default PCHeader = Form.create({})(PCHeader);
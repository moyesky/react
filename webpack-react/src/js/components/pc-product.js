import React from 'react';
 export default class PCProduct extends React.Component{
     render(){
         return(
            <div className="mod_r_product" ne-module="modules/product/product.js">
            <div className="cm_mod_tab cm_mod_tab1 mod_all_product">
              <div className="tab_nav">
                <h2><span className="title"><i />我的产品</span></h2>
                <a href="javascript:;" ne-click="productAll()" className="more" ne-text="{{myState.openProduct ? '返回':'全部产品'}}" target="_self">全部产品</a>
              </div>
              <div className="tab_main no_login_tabmain">
                {/* 网易新闻 */}
                <div className="cell clearfix cell_news">
                  <a href="http://www.163.com/newsapp" className="logo">网易新闻</a>
                  <div className="detail">
                    <h3><a href="http://www.163.com/newsapp">网易新闻</a></h3>
                    <div>
                      <a href="http://news.163.com/">新闻首页</a>
                      <a href="http://3g.163.com/ntes/special/00340QR4/app.html#download">ios下载</a>
                      <a href="http://3g.163.com/ntes/special/00340QR4/app.html#download">Android下载</a>
                    </div>
                  </div>
                </div>
                {/* 网易邮箱 */}
                <div className="cell clearfix cell_email">
                  <a href="http://email.163.com/" className="logo">网易邮箱</a>
                  <div className="detail">
                    <h3><a href="http://email.163.com/#from=ntes_product">网易邮箱</a></h3>
                    <div className="y_login">
                      未读邮件:
                      积分:
                      <a href="http://email.163.com/#from=ntes_product&ntes_mail_firstpage=compose" className="go_pro go_writemail" target="_blank" ne-href="{{myState.loginmail}}&ntes_mail_firstpage=compose"><span>写邮件</span></a>
                    </div>
                    <div className="no_login">
                      <a href="http://email.163.com/#from=ntes_product">免费邮</a>
                      <a href="http://vipmail.163.com/#from=www">VIP邮箱</a>
                      <a href="http://qiye.163.com/">企业邮箱</a>
                      <a href="http://mail.163.com/client/dl.html?from=mail46">邮箱大师</a>
                    </div>
                  </div>
                </div>
            </div>
            </div>
          </div>
         );
     };
 }
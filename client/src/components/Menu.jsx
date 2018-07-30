import React,{PropTypes}from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
class Menu extends React.PureComponent {
    constructor(context) {
        super(context);
        this.handlelogout = this.handlelogout.bind(this);
        this.handlehistory = this.handlehistory.bind(this);
        this.handlehome = this.handlehome.bind(this);
          }
          handlelogout(){
            this.context.router.replace('/logout');
          }
          handlehistory(){
            this.context.router.replace('/History');
          }
          handlehome(){
            this.context.router.replace('/Home');
          }
          render() {
            return (
    <Tabs >
<Tab label="Home" value="Home" onActive={this.handlehome}>
</Tab>
<Tab label="History" value="History" onActive={this.handlehistory}>
</Tab>
<Tab label="Logout" value="Logout" onActive={()=>handlelogout()}>
</Tab>
            </Tabs>)}}
Menu.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Menu;
import React,{PropTypes}from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
class HomeClient extends React.PureComponent {
    constructor(context) {
        super(context);
        this.handleclick = this.handleclick.bind(this);
          }
          handleclick(){
            this.context.router.replace('/logout');
          }
          render() {
            return (
    <Tabs >
<Tab label="Home" value="Home">
</Tab>
<Tab label="History" value="History">
</Tab>
<Tab label="Logout" value="Logout" onActive={this.handleclick}>
</Tab>
            </Tabs>)}}
HomeClient.contextTypes = {
  router: PropTypes.object.isRequired
};

export default HomeClient;
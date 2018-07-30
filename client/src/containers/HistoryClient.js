import React, { PropTypes } from 'react';
import HomePage from '../components/HomePage.jsx';
import Menu from '../components/Menu.jsx';
import HistoryPage from '../components/HistoryPage.jsx';

class HistoryClient extends React.PureComponent {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);
    // set the initial component state
    this.state = {
        projects:[]
      }
   
  }
  
  componentWillMount() {
    fetch('/project/table')
      .then(res => res.json())
      .then(rows => this.setState({projects: rows}, () => console.log("successfully fetched allwatches", rows)))
      .catch((err) => {
        console.log(err)
      })
  }

  
  /**
   * Render the component.
   */
  render() {
    return (
      <div>
      <Menu/>
      <HistoryPage
      project={this.state.projects}
      />
      </div>
    );
  }

}

HistoryClient.contextTypes = {
  router: PropTypes.object.isRequired
};

export default HistoryClient;

import React, { PropTypes } from 'react';
import HomePage from '../components/HomePage.jsx';
import Menu from '../components/Menu.jsx';

class HomeClient extends React.PureComponent {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);
    // set the initial component state
    this.state = {
    project_name:'',
    projects:[],
    errors: {},
    checked_project:'',
    iterator:{}
      }
   
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.Getiterator = this.Getiterator.bind(this);
  }
  Getiterator(i){
    if(i==this.state.iterator){this.state.checked_project=this.state.projects[i].id_project}
    else{
    this.setState(
      [
       this.state.checked_project=this.state.projects[i].id_project,
       this.state.projects[i].status=' Ready',
       this.state.iterator=i
      ]
    );}
    console.log(this.state.checked_project);
  }
  
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const project_name = encodeURIComponent(this.state.project_name);
    const formData = `project_name=${project_name}&username=${localStorage.token}`;
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/project/add');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          this.state.project_name='';
        console.log(xhr.response);
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        this.setState({
          errors
        });
console.log(xhr.response);
      }
    });
    xhr.send(formData);
  }
/**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  start(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const checked_project = encodeURIComponent(this.state.checked_project);
    const formData = `checked_project=${checked_project}`;
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/project/start');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          this.state.checked_project='';
          this.setState( [this.state.projects[this.state.iterator].status=xhr.response.message]);
        console.log(xhr.response);
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        this.setState({
          errors
        });
console.log(xhr.response);
      }
    });
    xhr.send(formData);
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  stop(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const checked_project = encodeURIComponent(this.state.checked_project);
    const formData = `checked_project=${checked_project}`;
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/project/stop');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          this.state.checked_project='';
          this.setState([this.state.projects[this.state.iterator].status=xhr.response.message]);
        console.log(xhr.response);
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        this.setState({
          errors
        });
console.log(xhr.response);
      }
    });
    xhr.send(formData);
  }
  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const project_name = event.target.value;

    this.setState({
        project_name
    });
  }
  componentDidMount() {
    fetch('/project/print')
      .then(res => res.json())
      .then(rows => this.setState({projects: rows}, () => console.log("successfully fetched allwatches", rows)))
  }

  
  /**
   * Render the component.
   */
  render() {
    return (
      <div>
      <Menu/>
      <HomePage
      errors={this.state.errors}
        onSubmit={this.processForm}
        onChange={this.changeUser}
        project_name={this.state.project_name}
      Cards={this.state.projects}
      check={this.Getiterator}
      start={this.start}
      stop={this.stop}
      />.
      </div>
    );
  }

}

HomeClient.contextTypes = {
  router: PropTypes.object.isRequired
};

export default HomeClient;

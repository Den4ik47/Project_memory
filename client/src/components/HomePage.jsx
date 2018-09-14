import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link, IndexLink } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';


const HomePage = ({
  project_name,
  onChange,
  onSubmit,
  Cards,
  errors,
  start,
  check,
  stop,
  status
  
}) => (
 
  <div>
<Card className="container">
<form action="/" onSubmit={onSubmit} id="forms">
<h2 className="card-heading">Create your new project</h2>
<div className="textfield">
<TextField 
hintStyle={{ textAlign: 'center', width: '100%' }}  
hintText="Please provide name of project" 
value={project_name}
onChange={onChange}
errorText={errors.name}
/>
</div>
<div className="button">
<RaisedButton
type="submit"
label="Add new project"
labelPosition="before"
containerElement="label" primary/>
</div>
</form>
<h2 className="card-heading">Your Project's</h2>
<div className="generate">

</div>

  <div>
  {Cards.map(function(object, i){
     return <div className="cards"  key={i}> 
                {[
                   // remove the key
                <Card><CardHeader title= {object.project_name+' '+(status[i]?status[i]:'')} ><div className="buttons"><RaisedButton label="Check Me!"  onClick= {() =>check(i)}/></div>  </CardHeader> </Card> 
                
                ]}
            </div>; })}</div>}))}
<div className="FloatingAction">
<FloatingActionButton className="element" onClick={start}>
Start
   </FloatingActionButton> 
    <FloatingActionButton className="element" onClick={stop}>
    Stop
      </FloatingActionButton>
</div>
);

HomePage.propTypes = {
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  project_name: PropTypes.string.isRequired,
  Cards:PropTypes.array.isRequired,
  start:PropTypes.func.isRequired,
  stop:PropTypes.func.isRequired,
  check:PropTypes.func.isRequired,
  status:PropTypes.array.isRequired
};

export default HomePage;

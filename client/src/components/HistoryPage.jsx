import React, { PropTypes } from 'react';
import {Card} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
const HistoryPage = ({
project  
}) => (
    <div id="Data">
      <Card className="container">
      <Table >
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Summary time</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
          >
            {project.map((data, i) =>
              <TableRow key={i} value={data}>
                <TableRowColumn>{data.id}</TableRowColumn>
                <TableRowColumn>{data.project_name}</TableRowColumn>
                <TableRowColumn>{data.time_summary}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
  </Table>
  </Card>
  <div className="button"><RaisedButton label="Import!" onClick={()=>exportTableToExcel('Data','Projects_Data')} primary/></div>
  </div>
);

HistoryPage.propTypes = {
    project:PropTypes.array.isRequired
};

export default HistoryPage;

import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';
import Issue from './issue';
import IssueDetail from './issueDetail';

const styles = {
	container: {
		marginTop:"40px",
		marginLeft: "40px",
		marginBottom: "40px"
	},
	titleContainer: {
		textAlign: "center",
		marginBottom: "40px"
	},
	navigation: {
		textAlign: 'center'
	},
	navigationButton: {
		display: 'inline',
		marginLeft: '10px',
		borderBottom: '1px solid  black',
		marginBottom: '40px'
	}
};

var Issues = React.createClass({

	getInitialState() {
		return {
			issues : null,
			currentPage: 1,
			individualView: null
		};
	},
	componentWillMount(){
		this.getIssues();
	},

	getIssues() {
		var request = new XMLHttpRequest();
		request.open("GET", "https://api.github.com/repos/rails/rails/issues");
		var that = this;

		request.onreadystatechange = function() {
			if (request.readyState != 4 || request.status != 200) {
				return;
			}
			var response = JSON.parse(request.responseText);
			that.setState({issues: response});
		};

		request.send();    
	},

	nextPage(){
		var currentPage = ++this.state.currentPage;
		this.setState({currentPage: currentPage});

	},
	previousPage(){
		var currentPage = --this.state.currentPage;
		this.setState({currentPage: currentPage});

	},

	viewIndividual(index){
		index++;
		this.setState({individualView: index});
	},

	resetViewIndividual(){
		this.setState({individualView: null});
	},

	render() {

		if(this.state.issues){
			var totalPages = Math.ceil(this.state.issues.length/25);
			var startPage = this.state.currentPage*25-25;
			var endPage = this.state.currentPage*25 > this.state.issues.length? this.state.issues.length : this.state.currentPage*25;
			var currentPageIssues = this.state.issues.slice(startPage, endPage);
		}
			
		return (
			<Grid >
				{!this.state.individualView?
					<Row>
						<Row style={styles.container} >
							<Row style={styles.titleContainer} > 
								<h1> Issues </h1> 
							</Row>

							<Row>
								{_.map(currentPageIssues, (element, index)=> {
									return (
										<Issue key={index} data={element} 						   viewIndividual={this.viewIndividual} 			   index={index} />
									);
								})}
							</Row>
						</Row>

						<Row style={styles.navigation}>
							{this.state.currentPage !== 1? 
								<div style={styles.navigationButton} onClick={this.previousPage} >Previous</div>
							:null}
							{this.state.currentPage !== totalPages? 
								<div style= {styles.navigationButton} onClick={this.nextPage} >Next</div>
							:null}
						</Row>
					</Row>
				:
					<Row>
						<Row>
							<a onClick={this.resetViewIndividual} > <h3>Back to all the issues </h3> </a>
						</Row>
						<Row>
							<IssueDetail data={this.state.issues[--this.state.individualView] } /> 
						</Row>
					</Row>
				}
			</Grid> 
		);
  }
});


module.exports = Issues;

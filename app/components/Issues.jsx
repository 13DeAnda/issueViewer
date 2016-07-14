import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';
import Issue from './issue.jsx';
import IssueDetail from './issueDetail.jsx';

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
            currentPage: 1
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
	console.log("here");
		var currentPage = ++this.state.currentPage;
		this.setState({currentPage: currentPage});

	},
	previousPage(){
		var currentPage = --this.state.currentPage;
		this.setState({currentPage: currentPage});

	},
	render() {

		if(this.state.issues){
			var totalPages = this.state.issues.length/15;
			var startPage = this.state.currentPage*15-15;
			var endPage = this.state.currentPage*15 > this.state.issues.length? this.state.issues.length : this.state.currentPage*15;
			var currentPageIssues = this.state.issues.slice(startPage, endPage);
		}
		
	    return (
			<Grid >
				<Row style={styles.container}>
	    			<Row style={styles.titleContainer}> 
	    				<h1> Issues </h1> 
	    			</Row>

	    			<Row>
			            {_.map(currentPageIssues, (element)=> {
			                return (
			                    <Issue data={element} />
			                );
			            })}
			        </Row>
			    </Row>

			    <Row style={styles.navigation}>
			    	{this.state.currentPage !== 1? 
			    		<div style= {styles.navigationButton} onClick= {this.previousPage} >Previous</div>
			    	:null}
			    	{this.state.currentPage !== totalPages? 
			    		<div style= {styles.navigationButton} onClick= {this.nextPage} >Next</div>
			    	:null}
			    </Row>

				<Row>
					//TODO: move to a single Route
				    {this.state.issues?
						<IssueDetail data= {this.state.issues[3] }  /> 
					:null}
				</Row>
    	    </Grid> 
	    );
  }
});


module.exports = Issues;

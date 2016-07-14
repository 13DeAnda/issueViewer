import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';
import Comments from './Comments.jsx';

const styles = {
	titleContainer: {
		textAlign: "center",
		marginBottom: "20px"
	},
	stateContainer: {
		marginTop:'20px'
	},
	stateTag: {
		border: 'solid',
		borderWidth: '1px',
		backgroundColor:  '#ccffdd',
		borderRadius: '15px'
	},
	tagContainer: {
		textAlign: 'center',
		lineHeight: '30px'
	},

	tag: {
		textAlign: 'center',
		display: 'inline',
		width: '70px',
		border: 'solid',
		borderWidth: '1px',
		backgroundColor:  '#ccffdd',
		borderRadius: '15px'
	},
	tagsContainer: {
		textAlign: 'center',
		width: '100%',
		marginBottom: '20px'
	},

	idContainer: {
		textAlign: 'center',
		color: 'red'
	},

	avatarImage: {
		height: '50px',
		width: '50px'
	}
};


var IssueDetail = React.createClass({
    getInitialState() {
        return {
        	comments: []
        };
    },

  	getComments() {
	    var request = new XMLHttpRequest();
	    request.open("GET", this.props.data.comments_url);
	    var that = this;

	    request.onreadystatechange = function() {
	        if (request.readyState != 4 || request.status != 200) {
	            return;
	        }
	        var response = JSON.parse(request.responseText);
	        that.setState({comments: response});
	    };

	    request.send();    
	},

	render() {
	    return (
	    	<Grid >
	    		<Row style= {styles.titleContainer} > 
	    			<Col sm={2}></Col>
	    			 <Col sm={1} style={styles.stateContainer}>
	    			 	<div style= {styles.stateTag}> 
	    			 		<h6>{this.props.data.state} </h6>
	    			 	</div>
	    			 </Col>
	    			 <Col sm={7}>
	    			 	<h1 style= {styles.title}> 
	    			 		{this.props.data.title}  
	    			 	</h1>
	    			</Col>
	    	    </Row>
	    		<Row style= {styles.tagsContainer} > 
    				{_.map(this.props.data.labels, (label) =>{
    						var newTagStyle = styles.tag;
    						newTagStyle.backgroundColor = '#'+label.color;;
    						return ( <div style = {newTagStyle}> {"..."+label.name+ "..."} </div>);
    				})}
	    		</Row>
		    	<Row style= {styles.idContainer} > 
  						#{this.props.data.id}
	    		</Row>
	    		<Row>
		    	    <Col sm={1}>
		    			<a href= {this.props.data.user.url}> {this.props.data.user.login} </a> <br />
		    			<img  style= {styles.avatarImage} src={this.props.data.user.avatar_url} />
		    	    </Col>
		    	    <Col sm={8}>
		    	    		{this.props.data.body}
		    	    </Col>
		    	</Row>
	    	    <Comments comments={this.props.data.comments_url} />

	        </Grid>
	    );
  }
});


module.exports = IssueDetail;
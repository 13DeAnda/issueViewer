import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';

const styles = {

	commentContainer: {
		marginTop: '20px',
		backgroundColor: '#ffffe6',
		border: '1px solid black'
	}
};


var Comments = React.createClass({
	getInitialState() {
		return {
			comments: []
		};
	},

	getComments() {
		var request = new XMLHttpRequest();
		request.open("GET", this.props.comments);
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

	componentWillMount(){
		this.getComments();
	},

	render() {
		return (
			<Grid >
				<div >
					{this.state.comments.length>0? <h1> Comments </h1> : null}

					{_.map(this.state.comments, (comment, key) =>{
							var usernames = comment.body.match(/\B@([a-z0-9](?:-?[a-z0-9]){0,38})/gi);
							var userIndex = [];

							_.forEach(usernames, function (username){
								var hyperlink = "<a href='github.com/'+username>"+username+"</a>";
								comment.body = comment.body.replace(username, hyperlink);
							});
							return (<div key ={key} style ={styles.commentContainer} dangerouslySetInnerHTML={{__html: comment.body}} />)
							
						})}
				</div>

			</Grid>
		);
  }
});


module.exports = Comments;
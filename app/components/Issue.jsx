import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid, Button} from 'react-bootstrap';

const styles = {

	container: {
		marginTop: '40px',
		marginRight: '150px',
		borderBottom: '1px solid  black'
	},

	idContainer: {
		color: 'red'
	},

	titleContainer: {
		marginRight: '30px',
		color: 'red'
	},

	userContainer: {
		textAlign: 'center'
	},

	tag: {
		display: 'inline',
		marginLeft: '2px',
		height: '23px',
		border: 'solid',
		borderWidth: '1px',
		borderRadius: '15px'
	},

	avatarImage: {
		height: '50px',
		width: '50px',
		marginLeft: '10px'
	},

};

var Issue = React.createClass({
	
	goToIssue (){
		this.props.viewIndividual(this.props.index);
	},

	render() {

		var descriptionTrimmed = this.props.data.body.slice(0,139);
		return (
			<Grid style={styles.container}>

				<Row >
					<Col sm={1} style= {styles.idContainer} >#{this.props.data.id} </Col>
					<Col sm={5} style= {styles.titleContainer} > {this.props.data.title} </Col>
					
					<Col sm={4} > 
						{_.map(this.props.data.labels, (label, key) =>{
								var newTagStyle = styles.tag;
								newTagStyle.backgroundColor = '#'+label.color;
								return ( <div key={key} style= {newTagStyle}> {label.name} </div>);
						})}
					</Col>
				</Row>

				<Row style={{marginTop:"10px"}}>
					<Col sm={1}  style= {styles.userContainer}>
						<a href={"https://github.com/"+this.props.data.user.login} > {this.props.data.user.login} </a> <br />
						<img  style={styles.avatarImage} 
							  src={this.props.data.user.avatar_url} />
					</Col>

					<Col sm={8} >
						{descriptionTrimmed+"..." }
					</Col>
					<Col sm={1}>
						<Button onClick={this.goToIssue} bsStyle="default" >more</Button>
					</Col>
				</Row>

			</Grid>
		);
	}
});


module.exports = Issue;

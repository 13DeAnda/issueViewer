import React from 'react';

import Issues from './issues.jsx';


export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<Issues />
			</div>
		);
	}
}

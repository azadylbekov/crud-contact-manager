import './App.scss';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { ButtonGroup } from '@material-ui/core';
import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { Container } from '@material-ui/core'
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core'
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import Home from './Pages/Home';
import Header from './Components/Header';
import Edit from './Pages/Edit'
import Add from './Pages/Add'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
	return (
		<Router>
			<Header />
			<div style={{ marginTop: 100 }}>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/edit'>
						<Edit />
					</Route>
					<Route exact path='/add'>
						<Add />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;

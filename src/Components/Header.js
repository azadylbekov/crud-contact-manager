import React from 'react'
import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'


function Header() {
	return (
		<AppBar>
			<Toolbar>
				<Grid container justifyContent='center'>
					<Typography variant='h4'>
						<Link style={{ textDecoration: 'none', color: '#fff' }} to='/'>Contact Manager</Link>
					</Typography>
				</Grid>
			</Toolbar>
		</AppBar>
	)
}

export default Header

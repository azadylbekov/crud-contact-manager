import React from 'react'
import { Grid } from '@material-ui/core'
import avatar from './../Images/avatar.png'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom'
import axios from 'axios'

function ContactItem({ name, email, id, handleDelete }) {


	return (
		<div className="contact-item" style={{ padding: '10px 0' }}>
			<Grid container justifyContent='space-between'>
				<div>
					<Grid item container alignItems='center'>
						<img
							src={avatar}
							alt=""
							width='50'
							height='50'
							style={{ borderRadius: '100%' }}
						/>
						<div style={{ marginLeft: 10 }}>
							<h3 style={{ margin: 0 }}>{name}</h3>
							<a href='#'>{email}</a>
						</div>
					</Grid>
				</div>
				<div>
					<Grid item container alignItems='center'>
						<Grid item>
							<IconButton
								component={Link}
								to={{ pathname: '/edit', state: { name, email, id } }}
								color='primary'
							>
								<Icon>create</Icon>
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton
								color='secondary'
								onClick={() => handleDelete(id)}
							>
								<Icon>delete</Icon>
							</IconButton>
						</Grid>
					</Grid>
				</div>
			</Grid>
			<hr />
		</div>
	)
}

export default ContactItem

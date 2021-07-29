import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Button, TextField, Icon, IconButton, Collapse } from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';


function Add() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [contactCreated, setContactCreated] = useState(false);

	const handleName = (e) => {
		setName(e.target.value);
	}

	const handleEmail = (e) => {
		setEmail(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:8000/contacts', {
			name: name,
			email: email
		}).then(res => {
			setContactCreated(true);
			setName('');
			setEmail('');
		})
			.catch(err => console.error(err));
	}

	return (
		<div className='Add'>
			<Container maxWidth='md'>
				<Collapse in={contactCreated}>
					<Alert
						style={{ marginBottom: 20 }}
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setContactCreated(false);
								}}
							>
								<Icon fontSize="inherit">close</Icon>
							</IconButton>
						}
					>
						Contact Created
					</Alert>
				</Collapse>
				<Grid container justifyContent='space-between' alignItems='center'>
					<Grid item>
						<Typography variant='h5'>Add Contact</Typography>
					</Grid>
					<Grid item>
						<Button component={Link} to='/' variant='contained' color='secondary'>Cancel</Button>
					</Grid>
				</Grid>
				<form
					onSubmit={handleSubmit}
					style={{ margin: "10px 0" }}>
					<TextField
						id="outlined-name"
						label="Name"
						variant="outlined"
						fullWidth
						style={{ marginBottom: 20 }}
						value={name}
						onChange={handleName}
					/>
					<TextField
						id="outlined-email"
						label="Email"
						variant="outlined"
						fullWidth
						type='email'
						value={email}
						onChange={handleEmail}
					/>
					<Button
						variant='contained'
						color='primary'
						style={{ marginTop: 10 }}
						type='submit'
					>
						Add
					</Button>
				</form>
			</Container>
		</div>
	)
}

export default Add

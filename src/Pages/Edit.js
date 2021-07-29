import React, { useState } from 'react'
import { Container, Grid, Typography, Button, TextField, Icon, IconButton, Collapse } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';



function Edit({ location }) {
	const history = useHistory();
	// console.log(history.location.state);
	// const [thisContact, setContact] = useState(history.location.state);
	const [name, setName] = useState(history.location.state.name);
	const [email, setEmail] = useState(history.location.state.email);
	const [id, setId] = useState(history.location.state.id);
	const [contactUpdated, setContactUpdated] = useState(false);

	const handleName = (e) => {
		setName(e.target.value);
	}

	const handleEmail = (e) => {
		setEmail(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const contact = { id, name, email }
		axios.put(`http://localhost:8000/contacts/${id}`, contact)
			.then(res => setContactUpdated(true))
			.catch(err => console.error(err));
	}

	return (
		<div className='Edit'>
			<Container maxWidth='md'>
				<Collapse in={contactUpdated}>
					<Alert
						style={{ marginBottom: 20 }}
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setContactUpdated(false);
								}}
							>
								<Icon fontSize="inherit">close</Icon>
							</IconButton>
						}
					>
						Contact Updated
					</Alert>
				</Collapse>
				<Grid container justifyContent='space-between' alignItems='center'>
					<Grid item>
						<Typography variant='h5'>Edit Contact</Typography>
					</Grid>
					<Grid item>
						<Button component={Link} to="/" variant='contained' color='secondary'>Cancel</Button>
					</Grid>
				</Grid>
				<form
					onSubmit={handleSubmit}
					style={{ margin: "10px 0" }}>
					<TextField
						id="outlined-basic"
						label="Name"
						variant="outlined"
						fullWidth
						style={{ marginBottom: 20 }}
						value={name}
						onChange={handleName}
					/>
					<TextField
						id="outlined-basic"
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
						Update
					</Button>
				</form>
			</Container>
		</div>
	)
}

export default Edit

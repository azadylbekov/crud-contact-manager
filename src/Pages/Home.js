import { Grid, Button, Container, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ContactItem from '../Components/ContactItem'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TextField } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';


function Home() {
	const [contacts, setContacts] = useState([]);
	const [contactsLoaded, setContactsLoaded] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [filteredContacts, setFiltered] = useState('filtered');

	useEffect(() => {


		retrieveContacts();
	}, [])

	const retrieveContacts = async () => {
		const allContacts = await getContacts();
		if (allContacts) {
			setContacts(allContacts);
			setFiltered(allContacts);
			setContactsLoaded(true);
		}
	}

	async function getContacts() {
		try {
			const response = await axios.get('http://localhost:8000/contacts');
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	const handleDelete = (id) => {
		axios.delete(`http://localhost:8000/contacts/${id}`)
			.then(res => console.log(res))
			.catch(err => console.error(err));
		console.log(contacts);
		setContacts(contacts.filter(contact => contact.id !== id));
		setFiltered(contacts.filter(contact => contact.id !== id));
	}

	useEffect(() => {
		setFiltered(contacts.filter(contact => {
			const name = contact.name.toLowerCase().trim();
			const email = contact.email.toLowerCase().trim();
			const search = searchText.toLowerCase().trim();
			return name.includes(search) || email.includes(search);
		}))
	}, [searchText])

	const handleSearch = (e) => {
		e.preventDefault();
		setSearchText(e.target.value);
	}

	return (
		<div className='Home'>
			<Container maxWidth='md'>
				<form onSubmit={(e) => { e.preventDefault() }}
					style={{ marginBottom: 20 }}>
					<TextField
						id="outlined-basic"
						label="Search"
						variant="outlined"
						fullWidth
						placeholder='Search for contact...'
						value={searchText}
						onChange={handleSearch}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Icon>search</Icon>
								</InputAdornment>
							),
						}}
					/>
				</form>
				<Grid
					container
					justifyContent='space-between'
					alignItems='center'>
					<Grid item>
						<Typography variant='h5'>Contact List</Typography>
					</Grid>
					<Grid item>
						<Button
							component={Link}
							to="/add"
							variant='contained'
							color='primary'>Add Contact</Button>
					</Grid>
				</Grid>
				<hr />
				{contactsLoaded ? (
					<div className="contact-list">
						{contacts.length <= 0 ? (
							<h2>No Contacts</h2>
						) :
							filteredContacts.length === 0 ?
								(<h2>No such contact</h2>)
								: filteredContacts.map((contact, idx) => (
									<ContactItem
										key={idx}
										name={contact.name}
										email={contact.email}
										id={contact.id}
										handleDelete={handleDelete}
									/>
								))}
					</div>) :
					<CircularProgress />
				}
			</Container>
		</div>
	)
}

export default Home

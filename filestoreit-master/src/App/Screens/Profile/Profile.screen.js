/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { CenteredContainer } from '../../Containers';
import { useAuth } from '../../Hooks/useAuth.hook';
export default function Profile() {
	const [error, setError] = useState('');
	const [providerId, setProviderId] = useState('');
	const [showUpdate, setShowUpdate] = useState(true);
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	useEffect(() => {
		currentUser.providerData.map(data => {
			if (data.providerId !== 'password') {
				setShowUpdate(false);
			} else if (data.providerId === 'password') {
				setShowUpdate(true);
			}
			setProviderId(data.providerId);
		});
	}, [currentUser]);
	async function handleLogout() {
		try {
			setError('');
			await logout();
			history.push('/login');
		} catch (error) {
			setError(error.message);
		}
	}
	return (
		<>
			<CenteredContainer>
				<Card>
					<Card.Body>
						<h2 className='text-center mb-4'>Profile</h2>
						{error && (
							<Alert onClose={() => setError('')} dismissible variant='danger'>
								<Alert.Heading>Error</Alert.Heading>
								<p>{error}</p>
							</Alert>
						)}
						<strong>Email:</strong> {currentUser.email}
						<br />
						<strong>Authentication Provider:</strong> {providerId}
						{showUpdate && (
							<Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
								Update Profile
							</Link>
						)}
					</Card.Body>
				</Card>
				<div className='w-100 text-center mt-2'>
					<Button variant='link' onClick={handleLogout}>
						Log Out
					</Button>
				</div>
			</CenteredContainer>
		</>
	);
}

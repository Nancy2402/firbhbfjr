import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { CenteredContainer } from '../../Containers';
import { useAuth } from '../../Hooks/useAuth.hook';

export default function Signup() {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const { register, errors, handleSubmit, watch, reset } = useForm({
		mode: 'all'
	});
	const passwordRef = useRef({});
	passwordRef.current = watch('password', '');
	const { updateEmail, updatePassword, currentUser } = useAuth();
	const history = useHistory();
	function isPasswordVisible() {
		showPassword ? setShowPassword(false) : setShowPassword(true);
	}
	async function onSubmit(data) {
		const { email, password } = data;

		setLoading(true);
		setError('');
		const promises = [];

		if (email !== currentUser.email) {
			promises.push(updateEmail(email));
		}
		if (password) {
			promises.push(updatePassword(password));
		}
		Promise.all(promises)
			.then(() => {
				history.push('/user');
			})
			.catch(err => {
				setError(err.message);
			})
			.finally(() => {
				reset(
					{},
					{
						errors: true,
						isDirty: false,
						isSubmitted: true,
						isValid: true,
						touched: false,
						dirtyFields: false,
						submitCount: true
					}
				);
				setLoading(false);
			});
	}
	return (
		<>
			<CenteredContainer>
				<Card>
					<Card.Body>
						<h2 className='text-center mb-4'>Update Profile</h2>
						{error && (
							<Alert variant='danger' onClose={() => setError('')} dismissible>
								<Alert.Heading>Error</Alert.Heading>
								<p>{error}</p>
							</Alert>
						)}
						<Form noValidate onSubmit={handleSubmit(onSubmit)}>
							<Form.Group id='email'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									defaultValue={currentUser.email}
									required
									isInvalid={errors.email}
									type='email'
									name='email'
									ref={register({
										required: {
											value: true,
											message: 'Email Is Required'
										},
										pattern: {
											value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
											message:
												'Email is Not Valid . Example :- example@example.com'
										}
									})}
								/>
								{errors.email && (
									<Form.Text className='text-danger'>
										{errors.email.message}
									</Form.Text>
								)}
							</Form.Group>
							<Form.Group id='password'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									placeholder='Leave Blank To Keep The Same'
									required
									isInvalid={errors.password}
									type={showPassword ? 'text' : 'password'}
									name='password'
									ref={register({
										required: {
											value: false
										},
										minLength: {
											value: 6,
											message: `Password Should be Atleast 6 characters`
										}
									})}
								/>
								{errors.password && (
									<Form.Text className='text-danger'>
										{errors.password.message}
									</Form.Text>
								)}
							</Form.Group>
							<Form.Group id='passwordConfirmation'>
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									placeholder='Leave Blank To Keep The Same'
									required
									isInvalid={errors.passwordConfirmation}
									type={showPassword ? 'text' : 'password'}
									name='passwordConfirmation'
									ref={register({
										required: {
											value: false
										},
										validate: value => {
											if (value === passwordRef.current) {
											} else {
												return 'Passwords do not match';
											}
										}
									})}
								/>
								{errors.passwordConfirmation && (
									<Form.Text className='text-danger'>
										{errors.passwordConfirmation.message}
									</Form.Text>
								)}
							</Form.Group>
							<Form.Check
								checked={showPassword}
								onChange={isPasswordVisible}
								label='Show Password'
							/>
							<Button disabled={loading} className='w-100 mt-2' type='submit'>
								Update Profile
							</Button>
						</Form>
						<div className='w-100 text-center mt-2'>
							<Link to='/user'>Cancel</Link>
						</div>
					</Card.Body>
				</Card>
			</CenteredContainer>
		</>
	);
}

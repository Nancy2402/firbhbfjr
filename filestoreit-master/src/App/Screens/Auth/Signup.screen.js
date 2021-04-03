import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import {
	FacebookButtonComponent,
	GithubButtonComponent,
	GoogleButtonComponent
} from '../../Components';
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
	const { signup, githubAuth, googleAuth, facebookAuth } = useAuth();
	const history = useHistory();
	function isPasswordVisible() {
		showPassword ? setShowPassword(false) : setShowPassword(true);
	}
	async function onSubmit(data) {
		try {
			const { email, password } = data;
			setError('');
			setLoading(true);
			await signup(email, password);
			history.push('/');
		} catch (err) {
			setError(err.message);
		} finally {
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
		}
	}
	async function signupWithGithub() {
		try {
			setError('');
			await githubAuth();
			history.push('/');
		} catch (error) {
			setError(error.message);
		}
	}
	async function signupWithGoogle() {
		try {
			setError('');
			await googleAuth();
			history.push('/');
		} catch (error) {
			setError(error.message);
		}
	}
	async function signupWithFacebook() {
		try {
			setError('');
			await facebookAuth();
			history.push('/');
		} catch (error) {
			setError(error.message);
		}
	}
	return (
		<>
			<CenteredContainer>
				<Card>
					<Card.Body>
						<h2 className='text-center mb-4'>Signup</h2>
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
									required
									isInvalid={errors.password}
									type={showPassword ? 'text' : 'password'}
									name='password'
									ref={register({
										required: {
											value: true,
											message: 'Password Is Required'
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
									required
									isInvalid={errors.passwordConfirmation}
									type={showPassword ? 'text' : 'password'}
									name='passwordConfirmation'
									ref={register({
										required: {
											value: true,
											message: 'Password Confirmation Is Required'
										},
										validate: value =>
											value === passwordRef.current || 'Passwords do not match'
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
							<Button
								disabled={loading}
								className='w-100 mt-2 mb-2'
								type='submit'>
								Signup
							</Button>
						</Form>
						<Card.Text className='w-100 text-center text-secondary'>
							Or
						</Card.Text>
						<GithubButtonComponent onClick={signupWithGithub} title='Signup' />
						<GoogleButtonComponent onClick={signupWithGoogle} title='Signup' />
						<FacebookButtonComponent
							onClick={signupWithFacebook}
							title='Signup'
						/>
					</Card.Body>
				</Card>
				<div className='w-100 text-center mt-2'>
					Already have an account? <Link to='/login'>Login</Link>
				</div>
			</CenteredContainer>
		</>
	);
}

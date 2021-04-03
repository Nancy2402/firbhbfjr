import { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import {
	FacebookButtonComponent,
	GithubButtonComponent,
	GoogleButtonComponent
} from '../../Components';
import { CenteredContainer } from '../../Containers/';
import { useAuth } from '../../Hooks/useAuth.hook';
export default function Login() {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const { register, errors, handleSubmit, reset } = useForm({
		mode: 'all'
	});
	const history = useHistory();
	const { login, githubAuth, googleAuth, facebookAuth } = useAuth();
	function isPasswordVisible() {
		showPassword ? setShowPassword(false) : setShowPassword(true);
	}
	async function onSubmit(data) {
		try {
			const { email, password } = data;
			setError('');
			setLoading(true);
			await login(email, password);
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
	async function loginWithGithub() {
		try {
			setError('');
			await githubAuth();
			history.push('/');
		} catch (error) {
			setError(error.message);
		}
	}
	async function loginWithGoogle() {
		try {
			setError('');
			await googleAuth();
			history.push('/');
		} catch (error) {
			setError(error.message);
		}
	}
	async function loginWithFacebook() {
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
						<h2 className='text-center mb-4'>Login</h2>
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
							<Form.Check
								checked={showPassword}
								onChange={isPasswordVisible}
								label='Show Password'
							/>
							<Button disabled={loading} className='w-100 mt-2' type='submit'>
								Login
							</Button>
						</Form>
						<Card.Text className='w-100 text-center text-secondary mt-2'>
							Or
						</Card.Text>
						<GithubButtonComponent onClick={loginWithGithub} title='Login' />
						<GoogleButtonComponent onClick={loginWithGoogle} title='Login' />
						<FacebookButtonComponent
							onClick={loginWithFacebook}
							title='Login'
						/>
						<div className='w-100 text-center mt-2'>
							<Link to='/forgot-password'>Forgot Password ?</Link>
						</div>
					</Card.Body>
				</Card>
				<div className='w-100 text-center mt-2'>
					Need an account ? <Link to='/signup'>Signup</Link>
				</div>
			</CenteredContainer>
		</>
	);
}

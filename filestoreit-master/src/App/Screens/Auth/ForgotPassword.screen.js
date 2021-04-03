import { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { CenteredContainer } from '../../Containers';
import { useAuth } from '../../Hooks/useAuth.hook';

export default function ForgotPassword() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const { register, errors, handleSubmit, reset } = useForm({
		mode: 'all'
	});
	const { resetPassword } = useAuth();
	async function onSubmit(data) {
		try {
			const { email } = data;
			setMessage('');
			setError('');
			setLoading(true);
			await resetPassword(email);
			setMessage('Check Your Inbox For Further Instructions');
		} catch (error) {
			setError(error.message);
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
	return (
		<>
			<CenteredContainer>
				<Card>
					<Card.Body>
						<h2 className='text-center mb-4'>Forgot Password</h2>
						{error && (
							<Alert variant='danger' onClose={() => setError('')} dismissible>
								<Alert.Heading>Error</Alert.Heading>
								<p>{error}</p>
							</Alert>
						)}
						{message && (
							<Alert
								variant='success'
								onClose={() => setMessage('')}
								dismissible>
								<Alert.Heading>Success</Alert.Heading>
								<p>{message}</p>
							</Alert>
						)}
						<Form noValidate onSubmit={handleSubmit(onSubmit)}>
							<Form.Group id='email'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									required
									name='email'
									type='email'
									isInvalid={errors.email}
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
								{errors.email ? (
									<Form.Text className='text-danger'>
										{errors.email.message}
									</Form.Text>
								) : (
									<Form.Text className='text-secondary'>
										Enter The Email In Which You Have Account Here
									</Form.Text>
								)}
							</Form.Group>
							<Button disabled={loading} className='w-100' type='submit'>
								Reset Password
							</Button>
						</Form>
						<div className='w-100 text-center mt-2'>
							<Link to='/login'>{message ? 'Back To Login' : 'Cancel'}</Link>
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

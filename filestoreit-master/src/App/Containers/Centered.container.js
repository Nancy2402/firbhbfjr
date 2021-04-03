import { Container } from 'react-bootstrap';

export default function Centered({ children }) {
	return (
		<Container
			className='d-flex align-items-center justify-content-center'
			style={{ minHeight: '90vh' }}>
			<div
				className='w-100'
				style={{
					maxWidth: '400px'
				}}>
				{children}
			</div>
		</Container>
	);
}

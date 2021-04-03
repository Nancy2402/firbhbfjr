import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
export default function FacebookButton({ title, onClick }) {
	return (
		<Button onClick={onClick} className='w-100 mt-2' variant='info'>
			<FontAwesomeIcon icon={faFacebook} className='mr-2' />
			{title} with Facebook
		</Button>
	);
}

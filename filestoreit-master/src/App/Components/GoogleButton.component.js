import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
export default function GoogleButton({ title, onClick }) {
	return (
		<Button onClick={onClick} className='w-100 mt-2' variant='dark'>
			<FontAwesomeIcon icon={faGoogle} className='mr-2' />
			{title} with Google
		</Button>
	);
}

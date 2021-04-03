import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
export default function GithubButton({ title, onClick }) {
	return (
		<Button onClick={onClick} className='w-100' variant='success'>
			<FontAwesomeIcon icon={faGithub} className='mr-2' />
			{title} with Github
		</Button>
	);
}

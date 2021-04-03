import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth.hook';
export default function PrivateRoute({ component: Component, ...props }) {
	const { currentUser } = useAuth();
	return (
		<Route
			exact
			{...props}
			render={props => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				);
			}}
		/>
	);
}

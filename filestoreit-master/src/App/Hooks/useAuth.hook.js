import { useContext } from 'react';
import { AuthContext } from '../Contexts/Auth.context';

export function useAuth() {
	return useContext(AuthContext);
}

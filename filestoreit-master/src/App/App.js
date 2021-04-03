import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRouteComponent } from './Components';
import { AuthProvider } from './Contexts/Auth.context';
import {
	ForgotPasswordScreen,
	LoginScreen,
	SignupScreen
} from './Screens/Auth';
import { ProfileScreen, UpdateProfileScreen } from './Screens/Profile';
export default function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<Switch>
						<PrivateRouteComponent path='/user' component={ProfileScreen} />
						<PrivateRouteComponent
							path='/update-profile'
							component={UpdateProfileScreen}
						/>
						<Route path='/signup' component={SignupScreen} />
						<Route path='/login' component={LoginScreen} />
						<Route path='/forgot-password' component={ForgotPasswordScreen} />
						<Redirect to='/' />
					</Switch>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

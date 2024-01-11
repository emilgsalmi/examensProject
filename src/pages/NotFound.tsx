import { Link } from 'react-router-dom';

export const NotFound = () => {
	return (
		// TEST CODE
		<>
			<p>ERROR 404</p>
			<Link to='/'>Back to home</Link>
		</>
	);
};
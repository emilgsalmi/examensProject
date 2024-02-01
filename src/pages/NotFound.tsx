// Import Link from react-router-dom
import { Link } from 'react-router-dom'

// Define the NotFound component
export const NotFound = () => {
	return (
		<>
			{/* Display an error message for 404 */}
			<p>ERROR 404</p>
			{/* Provide a link to navigate back to the home page */}
			<Link to='/'>Back to home</Link>
		</>
	)
}
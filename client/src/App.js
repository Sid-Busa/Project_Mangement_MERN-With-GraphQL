import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

//  write this code cuz when we update cache we not get warning in browser's console
const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				clients: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				projects: {
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: cache, //or new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Header />
				<div className='container'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/projects/:id' element={<Project />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;

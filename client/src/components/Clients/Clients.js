import { useQuery, useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import { GET_CLIENTS } from '../../queries/clientQueries';
import { DELETE_CLIENT } from '../../mutations/clientMutations';
import { GET_PROJECTS } from '../../queries/projectQueries';

const Clients = () => {
	const { loading, error, data } = useQuery(GET_CLIENTS);
	const [deleteClientData, setDeleteClientData] = useState({});
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: {
			id: deleteClientData.id,
		},
		refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
		// update(cache, { data: { deleteClient } }) {
		// 	const { clients } = cache.readQuery({ query: GET_CLIENTS });
		// 	cache.writeQuery({
		// 		query: GET_CLIENTS,
		// 		data: {
		// 			clients: clients.filter((client) => client.id !== deleteClient.id),
		// 		},
		// 	});
		// },
	});

	const isEmpty = (obj) => {
		return Object.keys(obj).length === 0;
	};

	useEffect(() => {
		if (!isEmpty(deleteClientData)) {
			deleteClient();
		}
	}, [JSON.stringify(deleteClientData)]);

	if (loading) return <Spinner />;
	if (error) return <p>Something Went Wrong</p>;

	return (
		<table className='table table-hover mt-3'>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{data.clients.map((client) => (
					<tr key={client.id}>
						<td>{client.name}</td>
						<td>{client.email}</td>
						<td>{client.phone}</td>
						<td>
							<button
								onClick={() => setDeleteClientData(client)}
								className='btn btn-danger btn-sm'
							>
								<FaTrash />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Clients;

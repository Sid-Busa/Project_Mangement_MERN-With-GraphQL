import { gql } from '@apollo/client';

export const Add_PROJECT = gql`
	mutation addProject(
		$name: String!
		$description: String!
		$status: ProjectStatusAdd!
		$clientId: String!
	) {
		addProject(
			name: $name
			description: $description
			status: $status
			clientId: $clientId
		) {
			id
			name
			description
			status
			client {
				id
				name
				email
				phone
			}
		}
	}
`;

export const UPDATE_PROJECT = gql`
	mutation updateProject(
		$id: ID!
		$name: String!
		$description: String!
		$status: ProjectStatusUpdate!
	) {
		updateProject(
			id: $id
			name: $name
			description: $description
			status: $status
		) {
			id
			name
			description
			status
		}
	}
`;

export const DELETE_PROJECT = gql`
	mutation deleteProject($id: ID!) {
		deleteProject(id: $id) {
			name
			id
		}
	}
`;

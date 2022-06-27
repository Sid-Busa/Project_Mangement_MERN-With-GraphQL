const { projects, clients } = require('../sampleData');
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
	GraphQLEnumType,
} = require('graphql');

// Moongose schema
const Project = require('../models/Projects');
const Client = require('../models/Clients');

// Project type
const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		clientId: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
		client: {
			type: ClientType,
			resolve(parent, args) {
				return Client.findById(parent.clientId);
			},
		},
	}),
});

// Client type
const ClientType = new GraphQLObjectType({
	name: 'Client',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				return Project.find();
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Project.findById(args.id);
			},
		},
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args) {
				return Client.find();
			},
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Client.findById(args.id);
			},
		},
	},
});

// Mutations
const mutations = new GraphQLObjectType({
	name: 'mutation',
	fields: {
		// Add Client
		addClient: {
			type: ClientType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				phone: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				const client = new Client({
					name: args.name,
					email: args.email,
					phone: args.phone,
				});

				return client.save();
			},
		},
		// Delete Client
		deleteClient: {
			type: ClientType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parent, args) {
				Project.find({ clientId: args.id }).then((projects) => {
					projects.forEach((project) => {
						project.remove();
					});
				});
				return Client.findByIdAndRemove(args.id);
			},
		},

		// Add Project
		addProject: {
			type: ProjectType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: new GraphQLNonNull(GraphQLString) },
				status: {
					type: new GraphQLEnumType({
						name: 'ProjectStatusAdd', //should be uniq
						values: {
							new: { value: 'Not Selected' },
							progress: { value: 'In Progress' },
							completed: { value: 'Completed' },
						},
					}),
					defaultValue: 'Not Selected',
				},
				clientId: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				const project = new Project({
					name: args.name,
					description: args.description,
					status: args.status,
					clientId: args.clientId,
				});
				return project.save();
			},
		},
		// Update Project
		updateProject: {
			type: ProjectType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: new GraphQLNonNull(GraphQLString) },
				status: {
					type: new GraphQLEnumType({
						name: 'ProjectStatusUpdate',
						values: {
							new: { value: 'Not Selected' },
							progress: { value: 'In Progress' },
							completed: { value: 'Completed' },
						},
					}),
					defaultValue: 'Not Selected',
				},
			},
			resolve(parent, args) {
				return Project.findOneAndUpdate(
					args.id,
					{
						$set: {
							name: args.name,
							description: args.description,
							status: args.status,
						},
					},
					{ new: true }
				);
			},
		},

		// Delete Project
		deleteProject: {
			type: ProjectType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parent, args) {
				return Project.findByIdAndRemove(args.id);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: mutations,
});

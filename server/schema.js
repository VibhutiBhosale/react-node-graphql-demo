const { gql } = require("apollo-server");

module.exports = gql`
  scalar JSON

  type User {
    id: ID!
    name: String
    username: String
    email: String
    phone: String
    website: String
    address: JSON
    company: JSON
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String
    body: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createPost(userId: ID!, title: String!, body: String!): Post
    deletePost(id: ID!): String
  }
`;

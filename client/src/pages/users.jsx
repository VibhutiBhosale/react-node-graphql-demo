import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query {
    users {
      id
      name
      username
      email
      phone
      website
      address
      company
    }
  }
`;

export default function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h2>User List</h2>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>

        <tbody>
          {data.users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address?.city}</td>
              <td>{u.company?.name}</td>
              <td>{u.phone}</td>
              <td>{u.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

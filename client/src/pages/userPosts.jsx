import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

const GET_USER_DETAILS = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      name
      email
      phone
      address
      company
      posts {
        id
        title
        body
      }
    }
  }
`;

export default function UserPosts() {
  const [userId, setUserId] = useState("");

  const { data: usersData } = useQuery(GET_USERS);
  const { data, loading } = useQuery(GET_USER_DETAILS, {
    variables: { id: userId },
    skip: !userId,
  });

  return (
    <div>
      <h2>Select User</h2>

      <select onChange={(e) => setUserId(e.target.value)}>
        <option value="">-- Select User --</option>
        {usersData?.users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      {loading && <p>Loading user details...</p>}

      {data?.user && (
        <>
          <h3>{data.user.name}</h3>
          <p>Email: {data.user.email}</p>
          <p>City: {data.user.address?.city}</p>
          <p>Company: {data.user.company?.name}</p>

          <h4>Posts</h4>
          {data.user.posts.length === 0 && <p>No posts</p>}

          <ul>
            {data.user.posts.map((p) => (
              <li key={p.id}>
                <strong>{p.title}</strong>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

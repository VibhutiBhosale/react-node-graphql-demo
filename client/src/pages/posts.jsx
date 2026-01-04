import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

/* ======================
   GraphQL Queries
====================== */

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

const GET_USER_POSTS = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      name
      posts {
        id
        title
        body
      }
    }
  }
`;

const CREATE_POST = gql`
  mutation ($userId: ID!, $title: String!, $body: String!) {
    createPost(userId: $userId, title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

const DELETE_POST = gql`
  mutation ($id: ID!) {
    deletePost(id: $id)
  }
`;

/* ======================
   Component
====================== */

export default function Posts() {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { data: usersData } = useQuery(GET_USERS);

  const {
    data,
    loading,
    refetch,
  } = useQuery(GET_USER_POSTS, {
    variables: { id: userId },
    skip: !userId,
  });

  const [createPost] = useMutation(CREATE_POST);
  const [deletePost] = useMutation(DELETE_POST);

  const handleCreate = async () => {
    if (!userId || !title || !body) {
      alert("Please select user and enter title & body");
      return;
    }

    await createPost({
      variables: { userId, title, body },
    });

    setTitle("");
    setBody("");
    refetch();
  };

  const handleDelete = async (id) => {
    await deletePost({ variables: { id } });
    refetch();
  };

  return (
    <div>
      <h2>User Posts</h2>

      {/* User Dropdown */}
      <select onChange={(e) => setUserId(e.target.value)}>
        <option value="">-- Select User --</option>
        {usersData?.users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      {/* Add Post */}
      {userId && (
        <div style={{ marginTop: "20px" }}>
          <h3>Add Post</h3>

          <input
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />

          <textarea
            placeholder="Post body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <br />

          <button onClick={handleCreate}>Add Post</button>
        </div>
      )}

      {/* Posts List */}
      {loading && <p>Loading posts...</p>}

      {data?.user && (
        <>
          <h3>Posts by {data.user.name}</h3>

          {data.user.posts.length === 0 && <p>No posts found</p>}

          <ul>
            {data.user.posts.map((p) => (
              <li key={p.id}>
                <strong>{p.title}</strong>
                <p>{p.body}</p>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

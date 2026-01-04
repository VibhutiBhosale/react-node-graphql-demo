const pool = require("./db");
const { v4: uuid } = require("uuid");

module.exports = {
  Query: {
    users: async () => {
      const res = await pool.query("SELECT * FROM users ORDER BY name");
      return res.rows;
    },

    user: async (_, { id }) => {
      const res = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      );
      return res.rows[0];
    },
  },

  User: {
    posts: async (parent) => {
      const res = await pool.query(
        "SELECT * FROM posts WHERE user_id = $1",
        [parent.id]
      );
      return res.rows;
    },
  },

  Mutation: {
    createPost: async (_, { userId, title, body }) => {
      const res = await pool.query(
        `
        INSERT INTO posts (id, user_id, title, body)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [uuid(), userId, title, body]
      );
      return res.rows[0];
    },

    deletePost: async (_, { id }) => {
      await pool.query("DELETE FROM posts WHERE id = $1", [id]);
      return "Post deleted";
    },
  },
};

export const fucntion_desc = [
  {
    type: "function",
    function: {
      name: "register_user",
      description: "Register the user using provided information",
      parameters: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "Username of user",
          },
          email: {
            type: "string",
            description: "Email provided by user",
          },
          password: {
            type: "string",
            description: "Password provided by user",
          },
        },
        required: ["username", "email", "password"],
      },
    },
  },

  {
    type: "function",
    function: {
      name: "login_user",
      description: "Login the user using provided credentials",
      parameters: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "Email provided by user",
          },
          password: {
            type: "string",
            description: "Password provided by user",
          },
        },
        required: ["email", "password"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_user",
      description: "Update user information with provided data",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "ID of the user to update",
          },
          username: {
            type: "string",
            description: "updated_username of user",
          },
          email: {
            type: "string",
            description: "updated_email provided by user",
          },
          password: {
            type: "string",
            description: "updated_password provided by user",
          },
        },
        required: ["id", "username", "email", "password"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "delete_user",
      description: "Delete user with provided user ID",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "ID of the user to delete",
          },
        },
        required: ["id"],
      },
    },
  },
];

# Using GPT Callback Functions for Third-Party API Actions

This repository provides a simple example of how to integrate GPT callback functions to perform various third-party API actions, such as CRUD operations, and how to sequence multiple operations by providing instructions to GPT just once.

## Getting Started

To get started, follow these steps:

1. Clone this repository to your local machine.

```bash
git clone https://github.com/your-username/gpt-api-actions.git
```

2. Navigate to the project directory.

```bash
cd gpt-api-actions
```

3. Install dependencies.

```bash
npm install
```

4. Set up your environment variables.

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
API_KEY=your_api_key
API_URL=api_base_url
```

Replace `your_api_key` with your actual API key and `api_base_url` with the base URL of the third-party API.

## Usage

### Using GPT Callback Functions

1. Start the server.

```bash
npm start
```

2. Open your favorite API client (e.g., Postman) and make a POST request to `http://localhost:3000/api/gpt-callback` with the following JSON payload:

```json
{
  "message": "Perform a GET request to fetch user data."
}
```

GPT will process the message and trigger the corresponding callback function to perform the specified API action.

### CRUD Operations

You can perform CRUD operations by providing instructions to GPT in the following format:

- **Create**: "Create a new user with name John Doe and email john@example.com."
- **Read**: "Fetch user data for user with ID 123."
- **Update**: "Update user information for user with ID 123."
- **Delete**: "Delete user with ID 123."

GPT will process the instructions and execute the corresponding CRUD operation using the provided API endpoints and data.

### Sequential Operations

You can sequence multiple API operations by providing instructions to GPT just once. For example:

"Create a new user with name John Doe and email john@example.com. Then, fetch user data for the newly created user."

GPT will interpret the instructions and execute the operations sequentially, ensuring that each operation is completed before moving on to the next one.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

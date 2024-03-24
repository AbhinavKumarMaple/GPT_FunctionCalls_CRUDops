import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoute from "./controller/user.controller.js";
import mongoose from "mongoose";
import {
  deleteAllUsers,
  Login,
  Register,
  updateUser,
  deleteUser,
} from "./funtions/index.js";
import { fucntion_desc } from "./Tools.js";
const app = express();
const port = 3000;

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.GPT_KEY,
});

const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());
app.use("/user", userRoute);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", async (req, res) => {
  const { account_number } = req.body;
  console.log("api called");
  const messages = [
    {
      role: "user",
      content: `register an account using any name, email, and password. Then, login with the created credentials. After logging in, modify the account information. Finally, delete the account.`,
    },
  ];
  const response = await runConversation({ messages }).then((response) =>
    res.send(response)
  );
});
app.get("/deleteUsers", async (req, res) => {
  const response = await deleteAllUsers();
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let counter = 5;
async function runConversation({ messages }) {
  console.log("runConversation messages", JSON.stringify(messages));

  return new Promise((resolve) => {
    let counter = 5;

    const recursiveFunction = async () => {
      if (counter <= 0) {
        console.log("base trigger", counter);
        const secondResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-0125",
          messages: messages,
        });
        console.log("secondResponse", JSON.stringify(secondResponse));
        resolve(secondResponse.choices[0].message.content);
      } else {
        const tools = fucntion_desc;

        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-0125",
          messages: messages,
          tools: tools,
          tool_choice: "auto",
        });
        const responseMessage = response.choices[0].message;

        const toolCalls = responseMessage.tool_calls;

        if (toolCalls) {
          const availableFunctions = {
            register_user: Register,
            login_user: Login,
            update_user: updateUser,
            delete_user: deleteUser,
          };

          messages.push(responseMessage);

          for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name;
            const functionToCall = availableFunctions[functionName];

            if (functionToCall) {
              const functionArgs = JSON.parse(toolCall.function.arguments);
              const functionResponse = await functionToCall({
                username: functionArgs.username,
                email: functionArgs.email,
                password: functionArgs.password,
                id: functionArgs.id,
                body: functionArgs.body,
              });
              messages.push({
                tool_call_id: toolCall.id,
                role: "tool",
                name: functionName,
                content: functionResponse,
              });
            } else {
              console.error(`Function '${functionName}' not found.`);
            }
          }
        }
        counter -= 1;
        recursiveFunction();
      }
    };

    recursiveFunction();
  });
}

import { openai } from "../config/openAIConfig.js";
import User from "../models/user.js";
const generateChat = async (req,res) => {
    const user =await User.findOne({ email: req.body.userEmail})
    user.chats.push({"role": "user", "content": req.body.message})
    const userChats= user.chats.map(({role,content})=>({role,content}))

    const chatCompletion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: userChats,
});

user.chats.push(chatCompletion.choices[0].message)
user.save();

      return res.status(200).json(user.chats)

};

export default generateChat;
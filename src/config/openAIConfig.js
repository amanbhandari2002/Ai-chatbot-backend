import { OpenAI ,} from "openai";

import { config } from 'dotenv';

config();

const openai = new OpenAI({apiKey: process.env.OPENAI_KEY,organization:process.env.OPENAI_ORG_ID});
// const openai=2;
export {openai};
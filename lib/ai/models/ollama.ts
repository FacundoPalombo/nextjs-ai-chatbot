import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
  ImageModel,
} from "ai";

import { ollama } from "ollama-ai-provider";

const phi3Mini = ollama("phi3:mini");
const llava = ollama("llava", {
  lowVram: true,
}) as unknown as ImageModel;

export const myProvider = customProvider({
  languageModels: {
    "chat-model-small": phi3Mini,
    "chat-model-large": phi3Mini,
    "chat-model-reasoning": wrapLanguageModel({
      model: phi3Mini,
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    "title-model": phi3Mini,
    "artifact-model": phi3Mini,
  },
  imageModels: {
    "small-model": llava,
    "large-model": llava,
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: "chat-model-small",
    name: "Standard model",
    description:
      "Its a high quality model lighter enough for daily task based on Deepseek R1",
  },
  {
    id: "chat-model-large",
    name: "Large model",
    description: "Large model for complex, multi-step tasks",
  },
  {
    id: "chat-model-reasoning",
    name: "Reasoning model",
    description: "Uses advanced reasoning",
  },
];

export const DEFAULT_CHAT_MODEL: string = "chat-model-small";

import { togetherai } from "@ai-sdk/togetherai";

import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

export const DEEPSEEK_R1_DISTILL_LLAMA_70B_FREE =
  "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free";

export const META_LLAMA_3_3_70B_INSTRUCT_TURBO_FREE =
  "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free";
export const FLUX_1_SCHNELL_FREE = "black-forest-labs/FLUX.1-schnell-Free";

export const DEFAULT_CHAT_MODEL: string = "chat-model-small";

export const myProvider = customProvider({
  languageModels: {
    "chat-model-small": togetherai.languageModel(
      DEEPSEEK_R1_DISTILL_LLAMA_70B_FREE
    ),
    "chat-model-large": togetherai.languageModel(
      META_LLAMA_3_3_70B_INSTRUCT_TURBO_FREE
    ),
    "chat-model-reasoning": wrapLanguageModel({
      model: togetherai.languageModel(META_LLAMA_3_3_70B_INSTRUCT_TURBO_FREE),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    "title-model": togetherai.languageModel(
      META_LLAMA_3_3_70B_INSTRUCT_TURBO_FREE
    ),
    "artifact-model": togetherai.languageModel(
      DEEPSEEK_R1_DISTILL_LLAMA_70B_FREE
    ),
  },
  imageModels: {
    "small-model": togetherai.imageModel(FLUX_1_SCHNELL_FREE),
    "large-model": togetherai.imageModel(FLUX_1_SCHNELL_FREE),
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
    name: "Deepseek R1 Distill Llama 70B Free",
    description: "Small model for fast, lightweight tasks",
  },
  {
    id: "chat-model-large",
    name: "Meta Llama 3.3-70B Instruct Turbo Free",
    description: "Large model for complex, multi-step tasks",
  },
  {
    id: "chat-model-reasoning",
    name: "Meta Llama 3.3-70B Instruct Turbo Free with reasoning CoT",
    description: "Uses advanced reasoning with CoT extended processing",
  },
];

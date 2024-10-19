import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Message, User } from "@prisma/client";

// Fetch all messages
export const fetchMessages = async (): Promise<Message[] | undefined> => {
  const { data } = await axios.get<ApiResponse>(`/api/messages`);
  return data.messages;
};

// Fetch accept messages status
export const fetchAcceptMessages = async (): Promise<boolean | undefined> => {
  const { data } = await axios.get<ApiResponse>(`/api/messages/accept`);
  return data.isAcceptingMessages;
};

// Toggle accept messages status
export const toggleAcceptMessages = async (acceptMessages: boolean): Promise<ApiResponse> => {
  const { data } = await axios.post<ApiResponse>(`/api/messages/accept`, {
    acceptMessages,
  });
  return data;
};

// Delete a message by ID
export const deleteMessage = async (messageId: string): Promise<ApiResponse> => {
  const { data } = await axios.delete<ApiResponse>(`/api/messages/delete/${messageId}`);
  return data;
};


export const suggestedUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<ApiResponse>(`/api/search`);
  return data.users;
};

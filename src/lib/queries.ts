import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Message, User } from "@prisma/client";

// Fetch all messages
export const fetchMessages = async (): Promise<Message[]> => {
  try {
    const { data } = await axios.get<ApiResponse>(`/api/messages`);
    return data.messages || []; // Return an empty array if messages are undefined
  } catch (error) {
    console.error("Error fetching messages:", error);
    return []; // Return an empty array on error
  }
};

// Fetch accept messages status
export const fetchAcceptMessages = async (): Promise<boolean> => {
  try {
    const { data } = await axios.get<ApiResponse>(`/api/messages/accept`);
    return data.isAcceptingMessages ?? false; // Default to false if undefined
  } catch (error) {
    console.error("Error fetching accept messages status:", error);
    return false; // Default to false on error
  }
};

// Toggle accept messages status
export const toggleAcceptMessages = async (acceptMessages: boolean): Promise<ApiResponse> => {
  try {
    const { data } = await axios.post<ApiResponse>(`/api/messages/accept`, {
      acceptMessages,
    });
    return data;
  } catch (error) {
    console.error("Error toggling accept messages:", error);
    throw error; // Re-throw the error for handling in the caller
  }
};

// Delete a message by ID
export const deleteMessage = async (messageId: string): Promise<ApiResponse> => {
  try {
    const { data } = await axios.delete<ApiResponse>(`/api/messages/delete/${messageId}`);
    return data;
  } catch (error) {
    console.error(`Error deleting message with ID ${messageId}:`, error);
    throw error; // Re-throw the error for handling in the caller
  }
};

// Fetch suggested users
export const suggestedUsers = async (): Promise<User[]> => {
  try {
    const { data } = await axios.get<ApiResponse>(`/api/search`);
    return data.users || []; // Return an empty array if users are undefined
  } catch (error) {
    console.error("Error fetching suggested users:", error);
    return []; // Return an empty array on error
  }
};

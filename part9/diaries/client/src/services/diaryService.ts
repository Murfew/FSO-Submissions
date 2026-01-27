import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from '../types.ts'

const baseUrl = 'http://localhost:3001/api/diaries'

type ErrorResponse = {error: string}

export const getAllDiaryEntries = async () => {
  const response = await axios
    .get<DiaryEntry[]>(baseUrl);
  return response.data;
}

export const createDiaryEntry = async (object: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, object)
    return response.data
  } catch (error) {
    if (axios.isAxiosError<ErrorResponse>(error)) {
      throw new Error(error.response?.data?.error ?? "Request failed")
    }
    throw new Error("Unexpected error")
  }
}

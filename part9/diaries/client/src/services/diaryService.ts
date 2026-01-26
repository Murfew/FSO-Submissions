import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from '../types.ts'

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllDiaryEntries = async () => {
  const response = await axios
    .get<DiaryEntry[]>(baseUrl);
  return response.data;
}

export const createDiaryEntry = async (object: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, object)
  return response.data
}

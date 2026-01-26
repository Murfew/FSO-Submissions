import axios from 'axios';
import type { DiaryEntry } from '../types.ts'

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllDiaryEntries = async () => {
  const response = await axios
    .get<DiaryEntry[]>(baseUrl);
  return response.data;
}

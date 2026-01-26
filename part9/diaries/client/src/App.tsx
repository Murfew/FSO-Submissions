import { useEffect, useState } from "react"
import type { DiaryEntry } from "./types"
import { getAllDiaryEntries } from "./services/diaryService"
import Entries from "./components/Entries"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
  const fetchDiaries = async () => {
    const entries = await getAllDiaryEntries()
    setDiaries(entries)
  }

  fetchDiaries()
}, [])

  return (
    <>
      <Entries entries={diaries}/>
    </>
  )
}

export default App

import { useEffect, useState } from "react"
import type { DiaryEntry } from "./types"
import { getAllDiaryEntries } from "./services/diaryService"
import Entries from "./components/Entries"
import NewEntryForm from "./components/NewEntryForm"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const fetchDiaries = async () => {
      const entries = await getAllDiaryEntries()
      setDiaries(entries)
    }

    fetchDiaries()
  }, [])

  const handleNewEntry = (entry: DiaryEntry) => {
    setDiaries(prev => [...prev, entry])
  }

  return (
    <div>
      <NewEntryForm handleNewEntry={handleNewEntry}/>
      <Entries entries={diaries}/>
    </div>
  )
}

export default App

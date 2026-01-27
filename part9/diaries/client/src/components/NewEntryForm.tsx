import { useState } from "react"
import { createDiaryEntry } from "../services/diaryService"
import type { NewEntryFormProps, Visibility, Weather } from "../types"

const NewEntryForm = (props: NewEntryFormProps) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('' as Visibility)
  const [weather, setWeather] = useState('' as Weather)
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      const newEntry = await createDiaryEntry({date, visibility, weather, comment})

      props.handleNewEntry(newEntry)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }

    setDate('')
    setVisibility('' as Visibility)
    setWeather('' as Weather)
    setComment('')
  }

  return (
    <div>
      <h3>Add new entry</h3>
      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
      <form onSubmit={addEntry}>
        <span style={{display:'block'}}>
          date <input type="text" value={date} onChange={(event) => setDate(event.target.value)}/>
        </span>
        <span style={{display:'block'}}>
          visibility <input type="text" value={visibility} onChange={(event) => setVisibility(event.target.value as Visibility)}/>
        </span>
        <span style={{display:'block'}}>
          weather <input type="text" value={weather} onChange={(event) => setWeather(event.target.value as Weather)}/>
        </span>
        <span style={{display:'block'}}>
          comment <input type="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
        </span>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default NewEntryForm

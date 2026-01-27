import { useState } from "react"
import { createDiaryEntry } from "../services/diaryService"
import { Visibility, Weather, type NewEntryFormProps } from "../types"

const NewEntryForm = (props: NewEntryFormProps) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      const newEntry = await createDiaryEntry({date, visibility, weather, comment})
      props.handleNewEntry(newEntry)
      setErrorMessage('')
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
          date <input type="date" value={date} onChange={(event) => setDate(event.target.value)}/>
        </span>
        <fieldset>
          <legend>Visibility</legend>

          {Object.values(Visibility).map((value) => (
            <label key={value} style={{ display: "block" }}>
              <input
                type="radio"
                name="visibility"
                value={value}
                checked={visibility === value}
                onChange={() => setVisibility(value)}
              />
              {value}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Weather</legend>

          {Object.values(Weather).map((value) => (
            <label key={value} style={{ display: "block" }}>
              <input
                type="radio"
                name="weather"
                value={value}
                checked={weather === value}
                onChange={() => setWeather(value)}
              />
              {value}
            </label>
          ))}
        </fieldset>
        <span style={{display:'block'}}>
          comment <input type="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
        </span>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default NewEntryForm

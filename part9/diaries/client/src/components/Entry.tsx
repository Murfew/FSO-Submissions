import type { EntryProps } from "../types"

const Entry = (props: EntryProps) => {
  return (
    <>
      <h4>{props.entry.date}</h4>
      <span style={{display:'block'}}>visibility: {props.entry.visibility}</span>
      <span style={{display:'block'}}>weather: {props.entry.weather}</span>
      <span style={{display:'block'}}>comment: {props.entry.comment}</span>
    </>
  )
}

export default Entry

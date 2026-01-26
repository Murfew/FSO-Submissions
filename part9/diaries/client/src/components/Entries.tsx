import type { EntriesProps } from "../types"
import Entry from "./Entry"

const Entries = (props: EntriesProps) => {
  return (
    <div>
      <h3>Diary entries</h3>
      {props.entries.map((entry) => <Entry key={entry.id} entry={entry}/>)}
    </div>
  )
}

export default Entries

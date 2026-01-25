import Part from "./Part"
import type { ContentProps } from "./types"

const Content = (props: ContentProps) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.name} part={part}/>
      ))}
    </>
  )
}

export default Content

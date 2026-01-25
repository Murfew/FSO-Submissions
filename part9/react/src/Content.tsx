type CoursePart = {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.parts.map(part => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  )
}

export default Content

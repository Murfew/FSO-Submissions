import Part from "./Part"

const Content = (props) => {
  return (
    <>
      <Part content={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part content={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part content={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </>
  )
}

export default Content

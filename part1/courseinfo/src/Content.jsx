import Part from "./Part"

const Content = (props) => {
  return (
    <>
      <Part content={props.part1} exercises={props.exercises1}/>
      <Part content={props.part2} exercises={props.exercises2}/>
      <Part content={props.part3} exercises={props.exercises3}/>
    </>
  )
}

export default Content

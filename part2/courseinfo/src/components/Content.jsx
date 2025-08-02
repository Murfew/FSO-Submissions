import Part from "./Part";

const Content = ({content}) => {
  return (
    <>
      {content.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
    </>
  )
};

export default Content

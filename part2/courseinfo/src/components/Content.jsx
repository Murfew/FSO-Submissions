import Part from "./Part";
import Total from "./Total";

const Content = ({content}) => {
  return (
    <>
      {content.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
      <Total parts={content}/>
    </>
  )
};

export default Content

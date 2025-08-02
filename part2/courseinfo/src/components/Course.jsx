import Content from "./Content";
import Header from "./Header";

const Course = ({course}) => {
  return (
    <>
      <Header text={course.name}/>
      <Content content={course.parts}/>
    </>
  )
};

export default Course

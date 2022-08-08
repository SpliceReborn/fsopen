const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </>
  )
  
}

const Course = ({course}) => {
  const sum = course.parts.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.exercises
  }, 0)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          id: 1,
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          id: 2,
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          id: 3,
          name: 'State of a component',
          exercises: 14
        },
        {
          id: 4,
          name: 'Redux',
          exercises: 11
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return <>
    <h1>Web development curriculum</h1>
    {courses.map(course => <Course key={course.id} course={course} />)}
  </>  
}

export default App
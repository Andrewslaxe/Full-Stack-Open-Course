export function App () {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ title }) => {
  return (<h1>{title}</h1>)
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, idx) => (
        <Part key={idx} part={part} />
      ))}
    </>
  )
}

const Total = ({ parts }) => {
  let result = 0
  parts.forEach(part => (result += part.exercises))
  return (
    <p>Number of excersises: {result} </p>
  )
}

const Part = ({ part }) => {
  return (
    <div>{part.name} {part.exercises}</div>
  )
}

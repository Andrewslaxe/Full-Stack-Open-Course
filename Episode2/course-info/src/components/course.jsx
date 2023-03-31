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
  result = parts.reduce((acc, currentVal) => acc + currentVal.exercises, 0)
  return (
    <p className='numberExercises'>Number of exercises: {result} </p>
  )
}

const Part = ({ part }) => {
  return (
    <div className='part'>{part.name} {part.exercises}</div>
  )
}

export const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

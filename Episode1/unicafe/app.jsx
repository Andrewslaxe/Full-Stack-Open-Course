import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return <div>{text}: {value}</div>
}

const Operations = ({ reviews }) => {
  const allReviews = reviews.good + reviews.neutral + reviews.bad
  const average = (reviews.good - reviews.bad) / allReviews
  const positive = reviews.good / allReviews
  return (
    <div>
      <StatisticLine text='All' value={allReviews} />
      <StatisticLine text='Average' value={average} />
      <StatisticLine text='Positive' value={positive} />
    </div>
  )
}

const Statistics = ({ reviews }) => {
  return (
    <div className='statistics'>
      <h1>Statistics</h1>
      {reviews.good === 0 && reviews.neutral === 0 && reviews.bad === 0
        ? <h3>No Feedback Given</h3>
        : (
          <div>
            <StatisticLine text='Good' value={reviews.good} />
            <StatisticLine text='Neutral' value={reviews.neutral} />
            <StatisticLine text='Bad' value={reviews.bad} />
            <Operations reviews={reviews} />
          </div>)}
    </div>
  )
}

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

export default function App () {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div className='mainPage'>
      <h1 className='title'>Give Feedback</h1>
      <div className='buttons'>
        <Button text='Good' handleClick={() => setGood(good + 1)} />
        <Button text='Neutral' handleClick={() => setNeutral(neutral + 1)} />
        <Button text='Bad' handleClick={() => setBad(bad + 1)} />
      </div>
      <Statistics reviews={{ good, neutral, bad }} />
    </div>
  )
}

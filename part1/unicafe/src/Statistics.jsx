const Statistics = ({good, neutral, bad}) => {
  const getAverage = () => {
    return (good - bad) / getTotal()
  }

  const getPositive = () => {
    return good / getTotal() * 100
  }

  const getTotal = () => {
    return good + bad + neutral
  }

  if (getTotal() === 0) {
    return (
      <p>No feedback received!</p>
    )
  } else {
    return (
      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>All : {getTotal()}</p>
        <p>Average: {getAverage()}</p>
        <p>Positive: {getPositive()} %</p>
      </div>
    )
  }
}

export default Statistics

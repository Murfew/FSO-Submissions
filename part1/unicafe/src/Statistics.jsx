import StatisticLine from "./StatisticLine"

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
      <table>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={getTotal()} />
        <StatisticLine text="Average" value={getAverage()} />
        <StatisticLine text="Positive (%)" value={getPositive()} />
      </table>
    )
  }
}

export default Statistics

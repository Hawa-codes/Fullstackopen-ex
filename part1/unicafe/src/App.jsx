// import { useState } from 'react'

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>{text}</button>
// )

// const StatisticLine = ({ text, value }) => (
//   <tr>
//     <td>{text}</td>
//     <td>{value}</td>
//   </tr>
// )

// const Statistics = ({ good, neutral, bad }) => {
//   const total = good + neutral + bad
//   const average = (good - bad) / total
//   const positive = (good / total) * 100
  
//   if (total === 0) {
//     return (
//       <div>
//         <h2>statistics</h2>
//         <p>No feedback given</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h2>statistics</h2>
//       <table>
//         <tbody>
//           <StatisticLine text="good" value={good} />
//           <StatisticLine text="neutral" value={neutral} />
//           <StatisticLine text="bad" value={bad} />
//           <StatisticLine text="all" value={total} />
//           <StatisticLine text="average" value={average} />
//           <StatisticLine text="positive" value={positive + " %"} />
//         </tbody>
//       </table>
//     </div>
//   )
// }


// const App = () => {
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)

//   return (
//     <div>
//       <h1>give feedback</h1>

//       <Button handleClick={() => setGood(good + 1)} text="good" />
//       <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
//       <Button handleClick={() => setBad(bad + 1)} text="bad" />

//       <Statistics good={good} neutral={neutral} bad={bad} />
//     </div>
//   )
// }

// export default App

import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0 : (good / all) * 100
    
  return (
    <div>
      <h2>give Feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h4>statistics</h4>
      <Statistics 
      good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}/>
    </div>
  )
}

export default App
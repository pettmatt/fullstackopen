import React, { useState } from 'react'
import Button from './Button'
import Content from './Content'

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text="Good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="Bad" />

            <h1>Statistics</h1>
            <Content statistic={[good, neutral, bad]} />
        </div>
    )
}

export default App
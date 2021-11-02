import Statistics from './Statistics'
import Total from './Total'

const Content = ({statistic}) => {

    // I could have achieved the same result with cleaner code by 
    // using multiple props named as good, neutral and bad. Instead of using
    // one prop with an array.

    // [0] = good, [1] = neutral, [2] = bad
    if (statistic[0] || statistic[1] || statistic[2]) {
        return (
            <table>
                <tbody>
                    <Statistics name="Good" value={statistic[0]} />
                    <Statistics name="Neutral" value={statistic[1]} />
                    <Statistics name="Bad" value={statistic[2]} />
                    <Total values={statistic} />
                </tbody>
            </table>
        )
    }

    return(
        <div>
            No feedback given
        </div>
    )
}

export default Content
import React from "react"

const Total = ({ values }) => {

    const total = values[0] + values[1] + values[2];
    const average = values[0] * 1 + values[1] * 0 + values[2] * -1;
    const positivePercent = (values[0] / total) * 100;

    return (
        <>
            <tr>
                <td>Total</td>
                <td>{total}</td>
            </tr>
            <tr>
                <td>Average</td>
                <td>{average}</td>
            </tr>
            <tr>
                <td>Positive</td>
                <td>{positivePercent} %</td>
            </tr>
        </>
    )
}

export default Total
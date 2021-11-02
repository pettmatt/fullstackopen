import React from "react"

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => (
  <>
    {
      parts.map(({ name, exercises, id }) =>
        <Part key={id} name={name} exercises={exercises} />
      )
    }
  </>
)

const Part = ({ name, exercises }) => (
  <p>
    {name} ({exercises})
  </p>
)

const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, currentValue) => 
    accumulator + currentValue.exercises, 0
  )

  return <p><b>Total number of exercises: {total}</b></p>
}

export default Course
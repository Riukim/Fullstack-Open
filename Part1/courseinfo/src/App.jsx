const Header = (props) => {
  console.log(props)
  return (
    <header>
      <h1>{props.course.name}</h1>
    </header>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.parts.name} {props.parts.exercises}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part parts={props.parts[0]} />
      <Part parts={props.parts[1]} />
      <Part parts={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </div>  
  )
}

const App = () => {

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
    <>
      <Header course={course}/>

      <Content parts={course.parts}/>

      <Total parts={course.parts}/>
    </>
  )
}

export default App
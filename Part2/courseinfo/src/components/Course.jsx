const Header =  ({ courseName }) => {
    return (
        <header>
            <h2>
                {courseName}
            </h2>
        </header>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    const totalExercises = parts.reduce((total, part) => total + part.exercises, 0);

    return (
        <div>
            {parts.map(part => (
                <Part key={part.id} part={part}/>
            ))}
            <p><b>total of {totalExercises} exercises</b></p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header courseName={course.name}/>
            <Content parts={course.parts}/>
        </div>
        )
}

export default Course

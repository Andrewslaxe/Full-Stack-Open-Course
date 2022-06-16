import React from "react"

const Course = (props) => {
	return (
		<>
			<h2>Web development curriculum</h2>
			<>
				{props.course.map((course) => (
					<div key={course.id}>
						<Header course={course} />
						<Content parts={course.parts} />
						<Total parts={course.parts} />
					</div>
				))}
			</>
		</>
	)
}
const Header = ({ course }) => <h3>{course.name}</h3>
const Content = (props) => {
	return (
		<div>
			{props.parts.map((part) => (
				<Part key={part.id} part={part.name} exercises={part.exercises} />
			))}
		</div>
	)
}
const Part = (props) => (
	<p>
		{props.part} {props.exercises}{" "}
	</p>
)
const Total = ({ parts }) => {
	const total = parts.reduce((acc, part) => acc + part.exercises, 0)
	return (
		<div>
			<b>Total of {total} exercises </b>
		</div>
	)
}

export default Course

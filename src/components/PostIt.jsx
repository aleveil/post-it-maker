function PostIt({ postIt, toggleTask, removePostIt }) {
	return (
		<div className="post-it-container">
			<h2>{postIt.title}</h2>
			<ul className="task-list">
				{postIt.tasks.map((task) => (
					<li className="task" key={`${postIt.id}-${task.id}`}>
						<p style={task.isDone ? {
							opacity: "50%",
							textDecoration: "line-through"
						} : {
							opacity: "100%",
							textDecoration: "none"
						}}>{task.text}</p>
						<button onClick={() => { toggleTask(postIt.id, task.id) }}>{task.isDone ? "Undone" : "Done"}</button>
					</li>
				))}
			</ul>
			<button onClick={() => removePostIt(postIt.id)}>Remove</button>
		</div>
	);
}

export default PostIt;
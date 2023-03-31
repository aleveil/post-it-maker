import { useState, useEffect } from "react";

function PostItForm({ addNewPostIt }) {

	const [titleText, setTitleText] = useState("");

	const [tasks, setTasks] = useState([{ id: 0, text: "", isDone: false }])
	const [taskIdCount, setTaskIdCount] = useState(1);

	function getNewId() {
		setTaskIdCount((prev) => prev + 1);
		return taskIdCount;
	}

	function addTaskInput(e) {
		e.preventDefault();
		const newId =
			setTasks([...tasks, { id: getNewId(), text: "", isDone: false }]);
	}

	function removeTaskInput(e, id) {
		e.preventDefault();
		setTasks(tasks.filter(task => task.id !== id));
	}

	function updateTaskText(id, text) {
		const currentTaskIndex = tasks.findIndex(task => task.id === id);
		const updatedTask = { ...tasks[currentTaskIndex], text: text };
		const newTasks = [...tasks];
		newTasks[currentTaskIndex] = updatedTask;
		setTasks(newTasks);
	}

	function getTaskById(id) {
		return tasks.find(task => task.id === id);
	}

	function resetForm() {
		setTaskIdCount(1);
		setTitleText("");
		setTasks([{ id: 0, text: "", isDone: false }]);
	}

	function handleCreatePostIt(e) {
		addNewPostIt(titleText, tasks, e)
		resetForm();
	}

	return (
		<form className="post-it-form">
			<h2>Create a Post-It</h2>
			<label>
				<h3>Title</h3>
				<input type="text" value={titleText} onChange={(e) => setTitleText(e.target.value)} />
			</label>
			<label>
				<h3>Tasks</h3>
				<ul className="task-list-form">
					{tasks.map((task, index) => (
						<li className="task-form" key={task.id}>
							<input
								type="text"
								onChange={(e) => updateTaskText(task.id, e.target.value)}
								value={getTaskById(task.id).text} />
							<button
								className="add-task-form-button"
								onClick={index === tasks.length - 1 ? addTaskInput : (e) => removeTaskInput(e, task.id)}>
								{index === tasks.length - 1 ? "+" : "-"}
							</button>
						</li>
					))}
				</ul>
			</label>
			<button onClick={handleCreatePostIt}>Create New Post-It</button>
		</form>
	);
}

export default PostItForm;
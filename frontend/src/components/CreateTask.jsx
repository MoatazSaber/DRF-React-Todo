import React from "react";

export default function CreateTaskForm(props) {
	let fileReader;
	const handleFileRead = (e) => {
		const content = fileReader.result;
		console.log(content);
		let textTodos = content.split("\n");
		textTodos.map((item) => {
			var csrftoken = props.getCookie("csrftoken");

			let url = "http://127.0.0.1:8000/api/task-create/";
			let title = item.slice(3);
			let completed = item[1] === " " ? false : true;
			let currentItem = {
				user: props.user.id,
				title: title,
				completed: completed,
			};
			fetch(url, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					"X-CSRFToken": csrftoken,
				},
				body: JSON.stringify(currentItem),
			})
				.then((response) => {
					props.fetchTasks();
				})
				.catch(function (error) {
					console.log("ERROR:", error);
				});
		});
	};

	const handleFileChosen = (file) => {
		fileReader = new FileReader();
		fileReader.onloadend = handleFileRead;
		fileReader.readAsText(file);
	};

	return (
		<div id="form-wrapper">
			<form onSubmit={props.handleSubmit} id="form">
				<div className="flex-wrapper">
					<div style={{ flex: 6 }}>
						<input
							onChange={props.handleChange}
							className="form-control"
							id="title"
							value={props.value}
							type="text"
							name="title"
							placeholder="Add task.."
						/>
					</div>

					<div style={{ flex: 1 }}>
						<input
							id="submit"
							className="btn btn-warning"
							type="submit"
							name="Add"
						/>
					</div>
				</div>
				<hr />

				<label id="submit" className="btn btn-block btn-warning">
					<i className="fa fa-image"></i>Import From Text File
					<input
						type="file"
						style={{ display: "none" }}
						name="file"
						accept="text/plain"
						onChange={(e) => handleFileChosen(e.target.files[0])}
					/>
				</label>
				<br />
			</form>
		</div>
	);
}

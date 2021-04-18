import "./App.css";
import React from "react";
import CreateTaskForm from "./components/CreateTask";
import Navbar from "./components/Navbar";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todoList: [],
			file: null,
			activeItem: {
				id: null,
				user: {},
				title: "",
				completed: false,
			},
			editing: false,
			user: null,
		};
		this.fetchTasks = this.fetchTasks.bind(this);
		this.getUser = this.getUser.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getCookie = this.getCookie.bind(this);

		this.startEdit = this.startEdit.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.strikeUnstrike = this.strikeUnstrike.bind(this);
	}

	getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie !== "") {
			var cookies = document.cookie.split(";");
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === name + "=") {
					cookieValue = decodeURIComponent(
						cookie.substring(name.length + 1)
					);
					break;
				}
			}
		}
		return cookieValue;
	}

	componentWillMount() {
		this.fetchTasks();
		this.getUser();
	}

	fetchTasks() {
		console.log("Fetching...");

		fetch("http://127.0.0.1:8000/api/tasks-list/")
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					todoList: data,
				});
			});
	}
	getUser() {
		console.log("Fetching current User...");
		fetch("http://127.0.0.1:8000/api/get-user/")
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					user: data,
					activeItem: {
						user: data.id,
					},
				});
			});
	}

	handleChange(e) {
		var value = e.target.value;
		this.setState({
			activeItem: {
				...this.state.activeItem,
				title: value,
			},
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		var csrftoken = this.getCookie("csrftoken");

		var url = "http://127.0.0.1:8000/api/task-create/";

		if (this.state.editing === true) {
			url = `http://127.0.0.1:8000/api/task-update/${this.state.activeItem.id}/`;
			this.setState({
				editing: false,
			});
		}

		fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"X-CSRFToken": csrftoken,
			},
			body: JSON.stringify(this.state.activeItem),
		})
			.then((response) => {
				this.fetchTasks();
				this.setState({
					activeItem: {
						user: this.state.user.id,
						id: null,
						title: "",
						completed: false,
					},
				});
			})
			.catch(function (error) {
				console.log("ERROR:", error);
			});
	}

	startEdit(task) {
		this.setState({
			activeItem: task,
			editing: true,
		});
	}

	deleteItem(task) {
		var csrftoken = this.getCookie("csrftoken");

		fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
				"X-CSRFToken": csrftoken,
			},
		}).then((response) => {
			this.fetchTasks();
		});
	}

	strikeUnstrike(task) {
		task.completed = !task.completed;
		var csrftoken = this.getCookie("csrftoken");
		var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`;

		fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"X-CSRFToken": csrftoken,
			},
			body: JSON.stringify({
				completed: task.completed,
				title: task.title,
			}),
		}).then(() => {
			this.fetchTasks();
		});
	}

	render() {
		var tasks = this.state.todoList;
		var self = this;
		return (
			<div>
				<Navbar user={this.state.user} />
				<div className="container">
					<div id="task-container">
						<CreateTaskForm
							getCookie={this.getCookie}
							user={this.state.user}
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
							value={this.state.activeItem.title}
							fetchTasks={this.fetchTasks}
						/>
						<div id="list-wrapper">
							{tasks.map(function (task, index) {
								return (
									<div
										key={index}
										className="task-wrapper flex-wrapper"
									>
										<div
											onClick={() =>
												self.strikeUnstrike(task)
											}
											style={{ flex: 7 }}
										>
											{task.completed === false ? (
												<span>{task.title}</span>
											) : (
												<strike>{task.title}</strike>
											)}
										</div>

										<div style={{ flex: 1 }}>
											<button
												onClick={() =>
													self.startEdit(task)
												}
												className="btn btn-sm btn-outline-info"
											>
												Edit
											</button>
										</div>

										<div style={{ flex: 1 }}>
											<button
												onClick={() =>
													self.deleteItem(task)
												}
												className="btn btn-sm btn-outline-dark delete"
											>
												-
											</button>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;

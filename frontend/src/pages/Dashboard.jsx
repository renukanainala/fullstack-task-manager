import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!task.trim()) return;

    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: task }),
    });

    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const editTask = async (id, oldTitle) => {
    const newTitle = prompt("Edit task", oldTitle);
    if (!newTitle) return;

    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTitle }),
    });

    const updatedTask = await res.json();
    setTasks(tasks.map(t => (t._id === id ? updatedTask : t)));
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(tasks.filter(t => t._id !== id));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dash-bg">
      {/* TOP BAR */}
      <div className="dash-top">
        <h2>Todo Dashboard</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      {/* MAIN CONTENT */}
      <div className="dash-main">
        <div className="task-input-box">
          <input
            className="dash-input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
          />
          <button className="add-task-btn" onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="task-list">
          {tasks.map(t => (
            <div className="task-item" key={t._id}>
              {/* ✅ BOLD TASK TITLE */}
              <span className="task-title">{t.title}</span>

              <div className="task-actions">
                <button
                  className="edit-btn"
                  onClick={() => editTask(t._id, t.title)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(t._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

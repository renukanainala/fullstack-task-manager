function TaskCard({ task }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </div>
  );
}

export default TaskCard;

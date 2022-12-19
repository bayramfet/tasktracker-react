import React from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";
import axios from "axios";

const TaskList = ({ task, getTask }) => {
  const deleteTask = async (id) => {
    const url = "http://127.0.0.1:8000/todo";
    try {
      await axios.delete(`${url}/${id}/`);
    } catch (error) {
      console.log(error);
    }
    getTask();
  };
  const toggleTask = async (item) => {
    const url = "http://127.0.0.1:8000/todo";
    try {
      await axios.put(`${url}/${item.id}/`, {
        ...item,
        is_done: !item.is_done,
      });
    } catch (error) {
      console.log(error);
    }
    getTask();
  };

  return (
    <div>
      {task.map((item) => {
        const { id, task, created_date } = item;
        return (
          <div
            key={id}
            onClick={() => toggleTask(item)}
            className="mt-2 d-flex justify-content-between bg-secondary rounded-2 p-2"
          >
            {item.is_done ? (
              <div className="text-decoration-line-through" role="button">
                <h4>{task}</h4>
                <p>{new Date(created_date).toLocaleString()}</p>
              </div>
            ) : (
              <div role="button">
                <h4>{task}</h4>
                <p>{new Date(created_date).toLocaleString()}</p>
              </div>
            )}
            <div>
              <RiDeleteBack2Fill
                onClick={() => deleteTask(id)}
                style={{
                  cursor: "pointer",
                  marginRight: "20px",
                  fontSize: "2rem",
                  boxShadow: "2px 2px 2px #ECAB9E",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;

import axios from "axios";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setID] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": localStorage.getItem("token"),
    },
  };

  const createTask = async (formData) => {
    try {
      const res = await axios.post(
        "https://todo-api-srishti.herokuapp.com/",
        formData,
        config
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTasks = async () => {
    try {
      const res = await axios.get("https://todo-api-srishti.herokuapp.com/", config);
      setTasks(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

   useEffect(() => {
   if (localStorage.getItem("token") != null) {
     getTasks();
   } else {
      window.location.href = "/";
    }
 });
  // logout button => localStorage.clear()

  const updateTask = async (id, formData) => {
    try {
      const res = await axios.put(
        "https://todo-api-srishti.herokuapp.com/" + id,
        formData,
        config
      );
      setIsUpdate(false);
      // setTasks(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(
        "https://todo-api-srishti.herokuapp.com/" + id,
        config
      );
      // setTasks(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <body class="bg-light">
      <div class="container">
        <main>
          <div>
            <h2>Add Items</h2>
          </div>

          <div class="row g-5">
            <div class="col-md-7 col-lg-8">
              <form>
                <div class="mb-3">
                  <label for="title" class="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    placeholder="Title here..."
                  />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">
                    Description
                  </label>
                  <textarea
                    class="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    rows="3"
                  ></textarea>
                </div>

                {isUpdate ? (
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={() => {
                        updateTask(id, { title, description });
                      }}
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={() => {
                        createTask({ title, description });
                      }}
                    >
                      Add
                    </button>
                  </div>
                )}

                <hr class="my-4" />

                <h4 class="mb-3">To Do List-</h4>

                <div class="my-3">
                  <div class="card" style={{ width: "100%" }}>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Title</th>
                          <th scope="col">Description</th>
                          <th scope="col">Update</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((item, i) => {
                          return (
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{item.title}</td>
                              <td>{item.description}</td>
                              <td>
                                {" "}
                                <button
                                  class="btn btn-primary"
                                  type="button"
                                  onClick={() => {
                                    setID(item._id);
                                    setTitle(item.title);
                                    setDescription(item.description);
                                    setIsUpdate(true);
                                  }}
                                >
                                  Update
                                </button>{" "}
                              </td>
                              <td>
                                {" "}
                                <button
                                  class="btn btn-primary"
                                  type="button"
                                  onClick={() => {
                                    deleteTask(item._id);
                                  }}
                                >
                                  Delete
                                </button>{" "}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </form>
              <button
                  class="btn btn-primary"
                   type="button"
                   onClick={() => {
                   localStorage.clear();
                    }}
              >
               Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </body>
  );
};

export default HomePage;

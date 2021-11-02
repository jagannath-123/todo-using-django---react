import React from "react";
import "./App.css";
import http from "./https-common";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      empty: true,
      arr: [],
      n: 0,
    };

    this.showTask = this.showTask.bind(this);
  }

  componentDidMount() {
    this.clicked = this.clicked.bind(this);
    this.clicked();
  }

  showTask(task, date, id) {
    return (
      <div className="container border border-light rounded-3 m-2 p-2">
        <h4 className="m-3">{task}</h4>
        <hr />
        <div className=" others m-2">
          <p className=" ">{date}</p>
          <button
            onClick={() => {
              http.delete("/tasks/" + id).then((temp) => {
                this.clicked();
              });
            }}
            className=" done   btn btn-danger rounded"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  clicked = () => {
    this.setState({ ...this.state, isFetching: true });
    http
      .get("/tasks/")
      .then((temp) => {
        this.setState({
          arr: temp.data,
          empty: false,
          isFetching: false,
        });
      })
      .catch((exception) => {
        console.log(exception);
        this.setState({ ...this.state, isFetching: false });
      });
  };

  render() {
    return (
      <div className="App App-header">
        <h1> Todo </h1>
        {/* <button onClick={() => this.clicked()}> click </button> */}
        {!this.state.empty && (
          <div className="container mr-5">
            {this.state.arr.map((i) => {
              return this.showTask(i.msg, i.date, i.id);
            })}
            
          </div>
          
        )}
        {
              this.state.empty && <div className="container mr-5"><h4>The Most Effective way to do it is TODO it</h4><p>PLan Your things now...</p></div>
            }

        <div className="row btn-group add">
          <button
            className="col align-self-end btn btn-danger rounded-pill"
            data-bs-toggle="modal"
            data-bs-target="#AddTaskModal"
          >
            ADD
          </button>

          <div
            className="modal fade"
            id="AddTaskModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content model">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Task
                  </h5>
                  <button
                    type="button"
                    className="btn-close bg bg-light text-light"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label htmlFor="new_task"> Task: </label>
                  <input
                    type="text"
                    name="new_task"
                    id="new_task"
                    className="rounded-pill p-1"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    id="add_task"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      http
                        .post("/tasks/", {
                          msg: document.getElementById("new_task").value,
                        })
                        .then((temp) => {
                          this.clicked();
                        });
                    }}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

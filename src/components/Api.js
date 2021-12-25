import React, { createRef } from "react";
import Update from "./Update";
import axios from "axios";

class Api extends React.Component {
  state = { persons: [], first: "", last: "" };
  btnRef = createRef();
  componentDidMount() {
    this.GetGet();
  }

  handleChange = (event) => {
    const newState = { ...this.state };
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  };
  checkUniqueUser = () => {
    return this.state.persons.some(
      (person) =>
        person.last === this.state.last && person.first === this.state.first
    );
  };
  handleSubmit = (event) => {
    event.preventDefault();
    //! if(this.state.first.length>2&&this.state.last.length>2){
    const checkNum = /^[a-zA-Z]+$/;
    if (
      checkNum.test(this.state.first) &&
      checkNum.test(this.state.last) &&
      !this.checkUniqueUser()
    ) {
      const user = {
        first: this.state.first,
        last: this.state.last,
      };
      this.btnRef.current.disabled = true;
      axios
        .post(`https://61c3018c9cfb8f0017a3e87e.mockapi.io/users`, user)
        .then((res) => {
          this.GetGet();
          this.btnRef.current.disabled = false;
        });
    }
  };
  GetGet = () => {
    axios
      .get(`https://61c3018c9cfb8f0017a3e87e.mockapi.io/users`)
      .then((res) => {
        const persons = res.data;
        this.setState({ persons });
      });
  };
  btnDelete = (personId, e) => {
    e.target.disabled = true;
    axios
      .delete(`https://61c3018c9cfb8f0017a3e87e.mockapi.io/users/${personId}`)
      .then(() => {
        this.GetGet();
      });
  };
  updatePut = (id, obj) => {
    axios
      .put(`https://61c3018c9cfb8f0017a3e87e.mockapi.io/users/${id}`, obj)
      .then(() => {
        this.GetGet();
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="first"
              onChange={this.handleChange}
              required
              minLength={2}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last"
              onChange={this.handleChange}
              required
              minLength={2}
            />
          </label>
          <button ref={this.btnRef} type="submit">
            Add
          </button>
        </form>
        <ul>
          {this.state.persons.map((person) => (
            <li key={person.id}>
              {person.first} {person.last}
              <button onClick={(e) => this.btnDelete(person.id, e)}>
                Delete
              </button>
              <Update id={person} onUpdate={this.updatePut} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Api;

import React from "react";
class Update extends React.Component {
  state = { value: null };
  btnUpdate = (person, e) => {
    person.first = this.state.value;
    this.props.onUpdate(person.id, person);
  };
  handleOnChange = (e) => {
    const newState = {};
    newState["value"] = e.target.value;
    this.setState(newState);
  };
  render() {
    return (
      <>
        <input
          type="text"
          name="update"
          required
          minLength={2}
          onChange={this.handleOnChange}
        />
        <button onClick={(e) => this.btnUpdate(this.props.id, e)}>
          Update
        </button>
      </>
    );
  }
}

export default Update;

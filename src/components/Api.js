import React from "react";
import axios from "axios";

class Api extends React.Component {
  state = {
    persons: {},
    id: 1,
    like: 0,
    dislike: 0,
  };
  componentDidMount() {
    this.GetGet();
  }
  LikeFunc = () => {
    this.setState((prev) => ({
      like: prev.like + 1,
    }));
    this.GetGet();
  };
  DisLikeFunc = () => {
    this.setState((prev) => ({
      dislike: prev.dislike + 1,
    }));
    this.GetGet();
  };
  GetGet = () => {
    this.setState((prev) => ({
      id: prev.id + 1,
    }));

    axios
      .get(`https://61c70ce390318500175472d8.mockapi.io/match/${this.state.id}`)
      .then((res) => {
        const persons = res.data;
        console.log(res);
        this.setState({ persons });
      })
      .catch((res) => {
        const persons = {};
        persons.name = "Error-End";
        console.log(res);
        this.setState({ persons });
      });
  };

  render() {
    return (
      <>
        <div>
          {this.state.like}
          <span aria-label="DisLikeFunc" role="img">
            🤩
          </span>
          {this.state.dislike}
          <span aria-label="DisLikeFunc" role="img">
            😵
          </span>
        </div>
        <div>
          <img
            src={this.state.persons.avatar}
            alt={this.state.persons.name}
            width="100px"
            height="100px"
          />
        </div>
        <div>{this.state.persons.name}</div>
        <div>
          <button onClick={this.LikeFunc}>
            <span aria-label="Like" role="img">
              ✔️
            </span>
          </button>
          <button onClick={this.DisLikeFunc}>
            <span aria-label="DisLikeFunc" role="img">
              ❌
            </span>
          </button>
        </div>
      </>
    );
  }
}

export default Api;

import "./searchbar.css";
import React from "react";

class Searchbar extends React.Component {
  handleChange = (event) => {
    this.setState({
      term: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleFormSubmit(this.state.term);
  };

  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit} className="form">
          <div className="field">
            <input
              onChange={this.handleChange}
              name="video-search"
              type="text"
              placeholder="Search.."
            />
          </div>
        </form>
      </div>
    );
  }
}
export default Searchbar;

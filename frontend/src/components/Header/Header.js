import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import './assets/sass/styles.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    const queryParam = queryString.parse(this.props.location.search);
    if (queryParam.q) {
      this.setState({ search:  queryParam.q})
    }
  }

  onSubmitHandler(event) {
    event.preventDefault();

    const {search} = this.state;
    console.log('search: %s', search);
    this.props.history.push(`/items?q=${search}`);
  }

  onChangeHandler(event) {
    this.setState({
      search: event.currentTarget.value
    });
  }

  render() {
    return (
      <div className="header-container">
        <div className="header">
          <div className="nav col-lg-10 col-md-10 col-xs-12 col-sm-12">
            <Link to="/" className="logo">Mercado Libre</Link>
            <form className="search-box" onSubmit={this.onSubmitHandler} role="search">
              <input
                type="text"
                className="search-input"
                placeholder="Nunca dejes de buscar"
                tabIndex="1"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                onChange={this.onChangeHandler}
                value={this.state.search}
              />
              <button
                type="submit"
                className="search-btn"
              >
                <i className="search-icon">
                  <span>Buscar</span>
                </i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

import React, {Component} from 'react';
import './assets/sass/styles.scss';

class Breadcrumb extends Component {
  render() {
    return (
      <div className="breadcrumb col-lg-10 col-md-10 col-xs-12 col-sm-12">
        <ul>
          {this.props.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Breadcrumb;

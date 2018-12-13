import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import getSymbolFromCurrency from 'currency-symbol-map';
import './assets/sass/styles.scss';

class ResultItem extends Component {

  render() {
    const {item} = this.props;

    return (
      <li className="search-container">
        <div className="row-item">
          <Link className="image" to={`/items/${item.id}`}>
            <img src={item.picture} alt={item.title} />
          </Link>
          <div className="item-info">
            <div className="location">{item.address}</div>
            <div className="price">
              <CurrencyFormat
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={item.price.decimals}
                value={item.price.amount}
                prefix={getSymbolFromCurrency(item.price.currency) + " "}
              />
              {item.free_shipping && (
                <div className="shipping">
                  <span>Envío gratis</span>
                </div>
              )}
            </div>
            <h2 className="title">
              <Link to={`/items/${item.id}`}>
                {item.title}
              </Link>
            </h2>
          </div>
        </div>
      </li>
    );
  }
}

export default ResultItem;

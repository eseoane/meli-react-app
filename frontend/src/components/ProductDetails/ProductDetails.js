import React, {Component} from 'react';
import CurrencyFormat from 'react-currency-format';
import getSymbolFromCurrency from 'currency-symbol-map';
import {Helmet} from 'react-helmet';
import Spinner from '../../components/Spinner';
import './assets/sass/styles.scss';

class ProductDetails extends Component {
  render() {
    const {loading, product} = this.props;
    if (loading || !product || product.length === 0) {
      return (
        <Spinner loading={loading}/>
      );
    }

    return (
      <div className="details-container col-lg-10 col-md-10 col-xs-12 col-sm-12">
        <Helmet>
          <meta name="description"
                content={`Compralo en Mercado Libre a $ ${product.price.amount} - Comprá en 12 cuotas. Encontrá más productos`}/>
        </Helmet>
        <div className="details">

          <div className="description-container">
            <div className="image">
              <img
                src={product.picture}
                alt="Imagen del producto"
              />
            </div>
            <div className="description">
              <h2>Descripción del producto</h2>
              <p className="text">{product.description}</p>
            </div>
          </div>

          <div className="info-container">
            <div className="condition">
              {product.condition === 'new' ? 'Nuevo' : 'Usado'} - {' '}
              {product.sold_quantity} vendidos
            </div>
            <header className="title">{product.title}</header>
            <div className="price">
              <CurrencyFormat
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={product.price.decimals}
                value={product.price.amount}
                prefix={getSymbolFromCurrency(product.price.currency) + " "}
              />
            </div>
            <button className="button-primary">
              Comprar
            </button>
          </div>

        </div>
      </div>
    );
  }
}

export default ProductDetails;

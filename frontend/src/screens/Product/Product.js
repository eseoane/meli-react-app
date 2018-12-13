import React, {Component} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import ProductDetails from '../../components/ProductDetails';
import API from '../../services/MeliApi';

class Product extends Component {
  state = {
    product: [],
    categories: [],
    loading: false
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({loading: true});

      API.findById(this.props.match.params.id)
        .then((response) => {
          this.setState({
            product: response.item,
            categories: response.categories,
            loading: false
          });
        })
        .catch((error) => {
          console.log(error);
          alert('Ocurrio un error!');
          this.setState({loading: false});
        });
    }
  }

  render() {
    const {loading, product, categories} = this.state;

    return (
      <div>
        <Breadcrumb items={categories}/>
        <ProductDetails product={product} loading={loading}/>
      </div>
    );
  }
}

export default Product;

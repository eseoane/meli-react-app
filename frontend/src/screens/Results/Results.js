import React, {Component} from 'react';
import queryString from 'query-string';
import {Helmet} from 'react-helmet';
import Breadcrumb from '../../components/Breadcrumb';
import ResultList from '../../components/ResultList';
import API from '../../services/MeliApi';

class Results extends Component {
  state = {
    items: [],
    categories: [],
    loading: false,
    search: ''
  };

  componentDidMount() {
    const queryParam = queryString.parse(this.props.location.search);
    if (queryParam.q) {
      this.makeSearch(queryParam.q);
    }
  }

  componentWillReceiveProps(nextProps) {
    const queryParam = queryString.parse(nextProps.location.search);
    if (queryParam.q) {
      this.makeSearch(queryParam.q);
    }
  }

  makeSearch(search) {
    this.setState({
      loading: true,
      search: search
    });

    API.find(search)
      .then((response) => {
        console.log(response);
        this.setState({
          items: response.items,
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

  render() {
    const {loading, search, items, categories} = this.state;

    return (
      <div>
        <Helmet>
          <meta name="description"
                content={`Encontrá ${search} - ${search} en Mercado Libre Argentina! Descubre la mejor forma de comprar online`}/>
        </Helmet>
        <Breadcrumb items={categories}/>
        <ResultList items={items} loading={loading}/>
      </div>
    );
  }
}

export default Results;

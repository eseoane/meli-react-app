import React, {Component} from 'react';
import Spinner from '../../components/Spinner';
import ResultItem from '../../components/ResultItem';
import './assets/sass/styles.scss';

class ResultList extends Component {

  render() {
    const {loading, items} = this.props;
    if (loading) {
      return (
        <Spinner loading={loading} />
      );
    }

    return (
      <div>
        <div className="search-container col-lg-10 col-md-10 col-xs-12 col-sm-12">
          {items && items.length ? (
            <ol>
              {items.map((item, index) => (
                <ResultItem key={index} item={item}/>
              ))}
            </ol>
          ) : (
            <b>
              No se encontraron resultados
            </b>
          )}
        </div>
      </div>
    );
  }
}

export default ResultList;

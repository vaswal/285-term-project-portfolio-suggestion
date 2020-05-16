import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Review = (props)  => {
  const [state, setState] = useState({ name: '', stock: '',data:''});
  
  useEffect(() => {
    const { steps } = props;
    const { name,stock } = steps;
    setState({ name,stock});
    let url =`https://financialmodelingprep.com/api/v3/stock/real-time-price/${stock.value}`;
    axios.get(url).then((response) => {
    console.log(response.data);
    setState({
     data: response.data});
    });
  }, [props])

    const { name,stock,data } = state;

    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>{stock.value}</td>
            </tr>
            <tr>
              <td>{data}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

export default Review;
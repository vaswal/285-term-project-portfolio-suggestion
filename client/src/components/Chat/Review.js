import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Review = (props) => {
    const [state, setState] = useState({name: '', stock: ''});
    const [data, setData] = useState({resp: ''});
    useEffect(() => {
        const {steps} = props;
        const {name, stock} = steps;
        setState({name, stock});
        const fetchData = async () => {
            const result = await axios(
                `https://financialmodelingprep.com/api/v3/stock/real-time-price/${stock.value}`,
            );
            setData(result.data);
        };
        fetchData();
    }, [props])

    const {name, stock} = state;
    const {resp} = data;

    return (
        <div style={{width: '100%'}}>
            <h3>Summary</h3>
            <table>
                <tbody>
                <tr>
                    <td>Name :</td>
                    <td>{name.value}</td>
                </tr>
                <tr>
                    <td>Stock :</td>
                    <td>{stock.value}</td>
                </tr>
                <tr>
                    <td>Price :</td>
                    <td>{data.price}</td>
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
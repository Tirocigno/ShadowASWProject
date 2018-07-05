import axios from 'axios'

export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';
 
export const fetchOrders = () => {
  return function(dispatch) {
    axios.get('/api/orders')
      .then((res) => {
        dispatch({
            type: FETCH_ORDERS_SUCCESS,
            orders: res
        })
      })
      .catch((err) => {
        dispatch({
            type: FETCH_ORDERS_ERROR,
            payload: err
        })
      })
  }
};
 

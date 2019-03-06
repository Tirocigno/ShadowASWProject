
//Axios si occupa di gestire le richieste e permette di visualizzare la percentuale di completamento

import axios from 'axios'

//Costanti al singolo blocco, export serve per renderle visibili al momento dell'import del modulo.
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

//Costrutto asincrono con callback(dispatch) chiamata alla fine.
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
 

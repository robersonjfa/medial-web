import { GET_CITIES, GET_CITIES_ERROR, CLEAR_CITIES } from './cidadesActionType';
import { GraphQLAPI } from '../../../http/API';

function mapCities(state, cities){
  const _cities = cities
    .map(city => ({
      value: city.id,
      label: city.nome,
    }));

  return {
    type: GET_CITIES,
    payload: {
      estado: state,
      list: _cities,
    },
  };
};

function getCityError(erro) {
  return {
    type: GET_CITIES_ERROR,
    payload: erro,
  };
};


export function getStateCities(state){  
  const GET_CITY = `
    {
      getCities(state: ${state}, search: "") {
        id,
        nome
      }
    }
  `;

  return function(dispatch) {
    return GraphQLAPI.post('', { query: GET_CITY })
      .then(response => {
        dispatch(mapCities(state, response.data.data.getCities));
      })
      .catch(erro => {
        dispatch(getCityError(erro));
      });
  };
};

export function clearCities(){
  return { type: CLEAR_CITIES };
}
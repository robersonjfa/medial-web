import { GET_CITIES, GET_CITIES_ERROR, CLEAR_CITIES } from './cidadesActionType';

const initialState = {
  estado: null,
  list: [],
  message: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CITIES:
      return Object.assign({}, state, {
        estado: action.payload.estado,
        list: action.payload.list,
        message: null,
      });
    case GET_CITIES_ERROR: 
      return Object.assign({}, state, {
        estado: action.payload.estado,
        list: action.payload.list,
        message: 'Não foi possível buscar as cidades',
      });
    case CLEAR_CITIES:
      return Object.assign({}, state, {
        estado: null,
        list: [],
        message: null,
      });
    default:
      return state;
  }
}
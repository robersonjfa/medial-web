import { REMOVER_NEGOCIADOR_ERROR,
         REMOVER_NEGOCIADOR_COMPLETE,
         ADQUIRIR_NEGOCIADORES_ERROR,
         ADQUIRIR_NEGOCIADORES_COMPLETE,
         CARREGANDO,
         ADQUIRIR_TOTAL_COMPLETE,
         ADQUIRIR_TOTAL_ERROR,
         BUSCAR_PESSOAS_COMPLETE,
         BUSCAR_PESSOAS_ERROR,
         CLEAR_PESSOAS} from './negociadorActionTypes';

const initialState = {
  negociadores: [],
  pessoas: [],
  quantidadeNegociadores: 0,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case REMOVER_NEGOCIADOR_ERROR: 
      return Object.assign({}, state, {
      });
    case REMOVER_NEGOCIADOR_COMPLETE: 
      return Object.assign({}, state, {
      }); 
    case ADQUIRIR_NEGOCIADORES_ERROR: 
      return Object.assign({}, state, {
        ...state,
        negociadores: [],
        error: action.payload.message,
        carregando: false,
      });
    case ADQUIRIR_NEGOCIADORES_COMPLETE: 
      return Object.assign({}, state, {
        ...state,
        negociadores: action.payload,
        carregando: false,
      }); 
    case CARREGANDO:
      return Object.assign({}, state, {
        ...state,
        carregando: true,
      }); 
    case ADQUIRIR_TOTAL_COMPLETE:
      return Object.assign({}, state, {
        ...state,
        quantidadeNegociadores: action.payload.valor,
        carregando: false,
      });
    case ADQUIRIR_TOTAL_ERROR:
      return Object.assign({}, state, {
        ...state,
        quantidadeNegociadores:0,
        error: action.payload.message,
        carregando: false,
      });
    case BUSCAR_PESSOAS_ERROR:
      return Object.assign({}, state, {
        ...state,
        pessoas: [],
        error: action.payload.message,
        carregando: false,
      }); 
    case BUSCAR_PESSOAS_COMPLETE:
      return Object.assign({}, state, {
        ...state,
        pessoas: action.payload,
        error: '',
        carregando: false,
      }); 
    case CLEAR_PESSOAS: 
    return Object.assign({}, state, {
      ...state,
      pessoas: [],
      carregando: false,
    }); 
    default:
      return state
  }
}
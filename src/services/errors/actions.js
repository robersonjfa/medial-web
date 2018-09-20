import { CLEAR_ERRORS, LOGIN_ERROR } from './actionTypes';
import { SENHA_EXIGE_8_DIGITOS } from '../register/user/messages';

export function clearErrors() {
  return { type: CLEAR_ERRORS }
}

export function digitosSenhaInsuficientes() {
  return { type: SENHA_EXIGE_8_DIGITOS }
}

export function loginError() {
  return { type: LOGIN_ERROR }
}
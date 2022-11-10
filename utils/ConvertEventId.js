import eventTypes from '../models/eventTypes.js';

export const convertEventId = (f) => {
  return {
    session_b: f[1] > eventTypes.session_b ? 0 : '1,' + f[1],
    session_c: f[2] > eventTypes.session_c ? 0 : '1,' + f[2],
    session_d: f[3] > eventTypes.session_d ? 0 : '1,' + f[3],
    session_e: f[4] > eventTypes.session_e ? 0 : '1,' + f[4],
    session_f: f[5] > eventTypes.session_f ? 0 : '1,' + f[5],
    session_g: f[6] > eventTypes.session_g ? 0 : '1,' + f[6],
    session_h: f[7] > eventTypes.session_h ? 0 : '1,' + f[7],
  }
}

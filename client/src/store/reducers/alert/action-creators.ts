import { AppDispatch } from 'store';
import { v4 as uuidv4 } from 'uuid';
import { AlertsActionEnum, AlertsAction, AlertPayload } from './types';

const DEFAULT_ALERT_LIFESPAN = 10;

export const AlertsActionCreators = {
  setAlertAction: (payload: AlertPayload): AlertsAction => ({
    type: AlertsActionEnum.SET_ALERT,
    payload,
  }),
  removeAlertAction: (payload: AlertPayload): AlertsAction => ({
    type: AlertsActionEnum.REMOVE_ALERT,
    payload,
  }),

  setAlert: (payload: AlertPayload) => async (dispatch: AppDispatch) => {
    const payloadWithId: AlertPayload = { id: uuidv4(), ...payload };

    dispatch(AlertsActionCreators.setAlertAction(payloadWithId));
    setTimeout(() => {
      dispatch(AlertsActionCreators.removeAlertAction(payloadWithId));
    }, (payload.lifespan || DEFAULT_ALERT_LIFESPAN) * 1000);

    return payloadWithId;
  },

  removeAlert: (payload: AlertPayload) => async (dispatch: AppDispatch) => {
    dispatch(AlertsActionCreators.removeAlertAction(payload));
  },
};

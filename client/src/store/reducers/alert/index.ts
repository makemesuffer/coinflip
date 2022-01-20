import { AlertsAction, AlertsActionEnum, AlertsState } from './types';

const initialState: AlertsState = {
  alerts: [],
};

export default function AlertsReducer(
  state = initialState,
  action: AlertsAction
): AlertsState {
  switch (action.type) {
    case AlertsActionEnum.SET_ALERT:
      return { alerts: [...state.alerts, action.payload] };
    case AlertsActionEnum.REMOVE_ALERT:
      return {
        alerts: state.alerts.filter((alert) => alert !== action.payload),
      };
    default:
      return state;
  }
}

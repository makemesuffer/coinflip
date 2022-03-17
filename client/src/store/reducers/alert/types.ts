import { ReactNode } from 'react';

export enum AlertTypes {
  success = 'alert-success',
  info = 'alert-info',
  warning = 'alert-warning',
  error = 'alert-error',
}

export interface AlertPayload {
  id?: string;
  type: AlertTypes;
  message: ReactNode | string;
  lifespan?: number;
}

export interface AlertsState {
  alerts: Array<AlertPayload>;
}

export enum AlertsActionEnum {
  SET_ALERT = 'SET_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT',
}

export interface AddAlert {
  type: AlertsActionEnum.SET_ALERT;
  payload: AlertPayload;
}

export interface RemoveAlert {
  type: AlertsActionEnum.REMOVE_ALERT;
  payload: AlertPayload;
}

export type AlertsAction = AddAlert | RemoveAlert;

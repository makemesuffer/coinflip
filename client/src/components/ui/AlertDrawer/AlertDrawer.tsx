import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Alert } from 'components/common/Alert';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { AlertPayload, AlertTypes } from 'store/reducers/alert/types';

type AlertIconsColorType = {
  [key in AlertTypes]?: string;
};

const AlertIconsColor: AlertIconsColorType = {
  'alert-error': 'text-red-500',
  'alert-info': 'text-blue-500',
  'alert-warning': 'text-yellow-500',
  'alert-success': 'text-green-600',
};

const AlertsDrawer = () => {
  const { alerts } = useTypedSelector((state) => state.alert);
  const { removeAlert } = useActions();

  return (
    <div className="absolute top-0 z-10 container p-5 md:w-96 mx-auto mt-5">
      <TransitionGroup className="todo-list">
        {alerts.map((alert: AlertPayload) => (
          <CSSTransition key={alert.id} timeout={300} classNames="alert">
            <div className="relative mb-4">
              <Alert type={alert.type} msg={alert.message} />
              <svg
                className={`fill-current h-6 w-6 ${
                  AlertIconsColor[alert.type]
                } absolute top-4 right-4`}
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() => removeAlert(alert)}
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default AlertsDrawer;

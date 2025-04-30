import { useAppSelector } from '@renderer/hooks/useAppSelector';
import { logsActions } from '@renderer/store/logs/slice';
import { RootState } from '@renderer/store/store';
import { Subtract } from '@shared/interfaces';
import { useDispatch } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

export type WithLogsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  logs: state.logs,
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    logsActions: bindActionCreators(logsActions, dispatch),
  };
}

export function withLogs<P>(Component: React.ComponentType<P>) {
  return (props: Subtract<P, WithLogsProps>) => {
    const state = useAppSelector(state => state);
    const dispatch = useDispatch();
    const stateProps = mapStateToProps(state);
    const dispatchProps = mapDispatchToProps(dispatch);
    return <Component
      {...stateProps}
      {...dispatchProps}
      {...props as P}/>;
  };
}

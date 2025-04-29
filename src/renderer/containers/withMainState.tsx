import { useAppSelector } from '@renderer/hooks/useAppSelector';
import { mainActions, MainState } from '@renderer/store/main/slice';
import { RootState } from '@renderer/store/store';
import { Subtract } from '@shared/interfaces';
import { useDispatch } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

export type WithMainStateProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  main: state.main,
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    dispatch,
    setMainState: (state: Partial<MainState>) => dispatch(mainActions.setMainState(state)),
    mainActions: bindActionCreators(mainActions, dispatch),
  };
}

export function withMainState<P>(Component: React.ComponentType<P>) {
  return (props: Subtract<P, WithMainStateProps>) => {
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

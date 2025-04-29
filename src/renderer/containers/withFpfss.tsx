import { useAppSelector } from '@renderer/hooks/useAppSelector';
import { fpfssActions } from '@renderer/store/fpfss/slice';
import { RootState } from '@renderer/store/store';
import { Subtract } from '@shared/interfaces';
import { useDispatch } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

export type WithFpfssProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  fpfss: state.fpfss,
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fpfssActions: bindActionCreators(fpfssActions, dispatch),
  };
}

export function withFpfss<P>(Component: React.ComponentType<P>) {
  return (props: Subtract<P, WithFpfssProps>) => {
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

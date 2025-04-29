import { useAppSelector } from '@renderer/hooks/useAppSelector';
import { forceSearch, ForceSearchAction, searchActions } from '@renderer/store/search/slice';
import { RootState, store } from '@renderer/store/store';
import { Subtract } from '@shared/interfaces';
import { useDispatch } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

export type WithSearchProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  search: state.search,
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    searchActions: {
      ...bindActionCreators(searchActions, dispatch),
      forceSearch: (action: ForceSearchAction) => { store.dispatch(forceSearch(action)); },
    }
  };
}

export function withSearch<P>(Component: React.ComponentType<P>) {
  return (props: Subtract<P, WithSearchProps>) => {
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

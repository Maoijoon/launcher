import { useAppSelector } from '@renderer/hooks/useAppSelector';
import { RootState } from '@renderer/store/store';
import { setTagCategories } from '@renderer/store/tagCategories/slice';
import { Subtract } from '@shared/interfaces';
import { TagCategory } from 'flashpoint-launcher';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

export type WithTagCategoriesProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  tagCategories: state.tagCategories,
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    setTagCategories: (tagCats: TagCategory[]) => dispatch(setTagCategories(tagCats)),
  };
}

export function withTagCategories<P>(Component: React.ComponentType<P>) {
  return (props: Subtract<P, WithTagCategoriesProps>) => {
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

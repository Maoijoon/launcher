import { useAppSelector } from '@renderer/hooks/useAppSelector';
import { RootState } from '@renderer/store/store';
import { addTask, setTask } from '@renderer/store/tasks/slice';
import { Subtract, Task } from '@shared/interfaces';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

export type WithTasksProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  tasks: state.tasks,
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addTask: (task: Task) => dispatch(addTask(task)),
    setTask: (task: Partial<Task>) => dispatch(setTask(task)),
  };
}

export function withTasks<P>(Component: React.ComponentType<P>) {
  return (props: Subtract<P, WithTasksProps>) => {
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

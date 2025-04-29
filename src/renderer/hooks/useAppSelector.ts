import { AppDispatch, RootState } from '@renderer/store/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export function useAppSelector<T>(func: (state: RootState) => T) {
  return useSelector((state: RootState) => func(state));
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

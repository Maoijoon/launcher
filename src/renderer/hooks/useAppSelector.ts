import { AppDispatch, RootState } from '@renderer/store/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

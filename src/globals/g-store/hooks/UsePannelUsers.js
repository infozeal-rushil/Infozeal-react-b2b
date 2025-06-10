import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@globals/g-providers/AuthProvider';
import {
  clearError,
  funcGetPannelUserMasterList
} from '@globals/g-store/slice/pannel/PannelUsersSlice';

export const usePannelUsers = () => {
  const dispatch = useDispatch();
  const { users, total, loading, error } = useSelector(
    state => state.pannelUsers
  );
  const { isAuthenticated } = useAuth();

  const refresh = (pageNo = 1, rowsPerPage = 10, searchTerm = '') => {
    if (!isAuthenticated) return;
    const token = localStorage.getItem('authToken');
    if (!token) return;
    dispatch(
      funcGetPannelUserMasterList({
        pageNo,
        rowsPerPage,
        searchTerm
      })
    );
    dispatch(clearError());
  };

  // Initial load
  useEffect(() => {
    refresh(1, 10, '');
    // eslint-disable-next-line
  }, []);

  return {
    users,
    total,
    loading,
    error,
    refresh
  };
};

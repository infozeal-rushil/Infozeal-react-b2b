import { useEffect, useRef } from 'react';
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

  // Store last params for refresh
  const lastParams = useRef({ pageNo: 1, rowsPerPage: 10, searchTerm: '' });

  const loadUsers = (pageNo = 1, rowsPerPage = 10, searchTerm = '') => {
    if (!isAuthenticated) return;
    const token = localStorage.getItem('authToken');
    if (!token) return;
    lastParams.current = { pageNo, rowsPerPage, searchTerm };
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
    loadUsers(1, 10, '');
  }, []);

  // The refresh function will use the last used params
  const refresh = () => {
    const { pageNo, rowsPerPage, searchTerm } = lastParams.current;
    loadUsers(pageNo, rowsPerPage, searchTerm);
  };

  return {
    users,
    total,
    loading,
    error,
    refresh
  };
};

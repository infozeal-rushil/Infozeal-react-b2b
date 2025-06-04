/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'globals/store/Index';
import { useAuth } from 'globals/providers/AuthProvider';
import {
  clearError,
  fetchPannelUsers
} from 'globals/store/slice/pannel/PannelUsersSlice';

export const usePannelUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, total, loading, error } = useSelector(
    (state: RootState) => state.pannelUsers
  );
  const { isAuthenticated } = useAuth();

  const loadUsers = (
    pageNo: number,
    rowsPerPage: number,
    searchTerm: string
  ) => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem('authToken');
    if (!token) return;

    dispatch(
      fetchPannelUsers({
        pageNo,
        rowsPerPage,
        searchTerm
        // filterStatusActive: ''
      })
    );
    clearError();
  };

  useEffect(() => {
    loadUsers(1, 30, '');
  }, []);

  // useEffect(() => {
  //   const tokenN = localStorage.getItem('authToken');
  //   if (!token) return;
  //   if(token) {
  //          dispatch(fetchPannelUsers({ token, 1, 10, '' }));

  //   }
  // }, [token]);

  return {
    users,
    total,
    loading,
    error,
    refresh: loadUsers
  };
};

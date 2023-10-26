import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const LINTER_SERVICE_FEATURE_KEY = 'linterService';

/*
 * Update these interfaces according to your requirements.
 */
export interface LinterServiceEntity {
  id: number;
}

export interface LinterServiceState extends EntityState<LinterServiceEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const linterServiceAdapter = createEntityAdapter<LinterServiceEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchLinterService())
 * }, [dispatch]);
 * ```
 */
export const fetchLinterService = createAsyncThunk<LinterServiceEntity[]>(
  'linterService/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getLinterServices()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialLinterServiceState: LinterServiceState =
  linterServiceAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const linterServiceSlice = createSlice({
  name: LINTER_SERVICE_FEATURE_KEY,
  initialState: initialLinterServiceState,
  reducers: {
    add: linterServiceAdapter.addOne,
    remove: linterServiceAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinterService.pending, (state: LinterServiceState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchLinterService.fulfilled,
        (
          state: LinterServiceState,
          action: PayloadAction<LinterServiceEntity[]>
        ) => {
          linterServiceAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchLinterService.rejected,
        (state: LinterServiceState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const linterServiceReducer = linterServiceSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(linterServiceActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const linterServiceActions = linterServiceSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllLinterService);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = linterServiceAdapter.getSelectors();

export const getLinterServiceState = (rootState: {
  [LINTER_SERVICE_FEATURE_KEY]: LinterServiceState;
}): LinterServiceState => rootState[LINTER_SERVICE_FEATURE_KEY];

export const selectAllLinterService = createSelector(
  getLinterServiceState,
  selectAll
);

export const selectLinterServiceEntities = createSelector(
  getLinterServiceState,
  selectEntities
);

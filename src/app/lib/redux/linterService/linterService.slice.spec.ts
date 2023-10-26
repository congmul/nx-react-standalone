import {
  fetchLinterService,
  linterServiceAdapter,
  linterServiceReducer,
} from './linterService.slice';

describe('linterService reducer', () => {
  it('should handle initial state', () => {
    const expected = linterServiceAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(linterServiceReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchLinterService', () => {
    let state = linterServiceReducer(undefined, fetchLinterService.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = linterServiceReducer(
      state,
      fetchLinterService.fulfilled([{ id: 1 }], '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );

    state = linterServiceReducer(
      state,
      fetchLinterService.rejected(new Error('Uh oh'), '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );
  });
});

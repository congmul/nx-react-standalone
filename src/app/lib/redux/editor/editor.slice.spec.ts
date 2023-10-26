import { fetchEditor, editorAdapter, editorReducer } from './editor.slice';

describe('editor reducer', () => {
  it('should handle initial state', () => {
    const expected = editorAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(editorReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchEditor', () => {
    let state = editorReducer(undefined, fetchEditor.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = editorReducer(state, fetchEditor.fulfilled([{ id: 1 }], ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );

    state = editorReducer(state, fetchEditor.rejected(new Error('Uh oh'), ''));

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

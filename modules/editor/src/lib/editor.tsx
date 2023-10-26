import styles from './editor.module.scss';

/* eslint-disable-next-line */
export interface EditorProps {}

export function Editor(props: EditorProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Editor!</h1>
    </div>
  );
}

export default Editor;

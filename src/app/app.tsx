// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { Ui, Dashboard } from '@nx-react-standalone/ui'

export function App() {  
  return (
    <div>
      <h2>Welcome</h2>
      <Ui />
      <Dashboard />
    </div>
  );
}

export default App;

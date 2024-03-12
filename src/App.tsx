import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NewMonitorPage } from "./pages/new-monitor";
import { MonitorPage } from './pages/monitor';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={NewMonitorPage} />
        <Route path="/v1" component={MonitorPage} />
      </Switch>
    </Router>
  );
}

import { AppHeader } from "./components/Header/AppHeader";
import { AppLayout } from "./components/Layout/AppLayout";

import "./App.css";

function App(): React.JSX.Element {
  return (
    <AppLayout>
      <AppHeader />
    </AppLayout>
  );
}

export default App;

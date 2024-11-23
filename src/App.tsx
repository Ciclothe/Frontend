import AppProviders from "@/context/AppProviders";
import RoutesViews from "../routes/Routes";

function App() {
  return (
    <AppProviders>
      <RoutesViews />
    </AppProviders>
  );
}

export default App;

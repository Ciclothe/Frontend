import AppProviders from "@/context/AppProviders";
import RoutesViews from "../routes/Routes";
import "react-lazy-load-image-component/src/effects/blur.css";

function App() {
  return (
    <AppProviders>
      <RoutesViews />
    </AppProviders>
  );
}

export default App;

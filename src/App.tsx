import AppProviders from "@/context/AppProviders";
import RoutesViews from "../routes/Routes";
import "react-lazy-load-image-component/src/effects/blur.css";
import { NotificationsProvider } from "./context/NotificationsContext";

function App() {
  return (
    <NotificationsProvider>
      <AppProviders>
        <RoutesViews />
      </AppProviders>
    </NotificationsProvider>
  );
}

export default App;

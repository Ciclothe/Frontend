import { useEffect, useState } from "react";
import AppProviders from "@/context/AppProviders";
import RoutesViews from "../routes/Routes";
import "react-lazy-load-image-component/src/effects/blur.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return <div className="loading-spinner">Cargando...</div>;
  }

  return (
    <AppProviders>
      <RoutesViews />
    </AppProviders>
  );
}

export default App;

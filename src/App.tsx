import { I18nextProvider } from "react-i18next";
import i18n from "../public/i18n.d";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import RoutesViews from "../routes/Routes";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <ThemeProvider>
          <RoutesViews />
        </ThemeProvider>
      </UserProvider>
    </I18nextProvider>
  );
}

export default App;

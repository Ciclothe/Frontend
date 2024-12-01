import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../public/i18n.d";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import UserDataProvider from "@/context/UserDataContext";
import { ActiveSectionProvider } from "@/context/ActiveSectionContext";
import { CreatePostActive } from "@/context/CreatePostActive";
import { SwapProvider } from "@/context/SwapContext";
import { SectionOptionsProvider } from "@/context/SectionOptionsContext";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <SectionOptionsProvider>
        <SwapProvider>
          <CreatePostActive>
            <ActiveSectionProvider>
              <UserProvider>
                <UserDataProvider>
                  <ThemeProvider>{children}</ThemeProvider>
                </UserDataProvider>
              </UserProvider>
            </ActiveSectionProvider>
          </CreatePostActive>
        </SwapProvider>
      </SectionOptionsProvider>
    </I18nextProvider>
  );
};

export default AppProviders;

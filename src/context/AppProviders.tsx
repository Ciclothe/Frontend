/**
 * AppProviders component is a wrapper that provides various context providers
 * to the entire application. It includes internationalization, theme, user data,
 * active section, post creation, swapping, section options, search, and search location contexts.
 *
 * @param {AppProvidersProps} props - The props for the AppProviders component.
 * @param {ReactNode} props.children - The child components that will be wrapped by the context providers.
 * @returns {JSX.Element} The AppProviders component with all the context providers.
 */
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
import { SearchProvider } from "@/context/SearchContext";
import { SearchLocationProvider } from "@/context/RangeLocationContext";
import { MobileMenuProvider } from "@/context/MobileMenuContext";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <MobileMenuProvider>
        <SearchProvider>
          <SearchLocationProvider>
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
          </SearchLocationProvider>
        </SearchProvider>
      </MobileMenuProvider>
    </I18nextProvider>
  );
};

export default AppProviders;

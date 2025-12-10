import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ConsentStatus = "pending" | "accepted" | "declined";

interface CookieConsentContextType {
  consentStatus: ConsentStatus;
  showBanner: boolean;
  acceptCookies: () => void;
  declineCookies: () => void;
  openConsentBanner: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const STORAGE_KEY = "sbm_cookie_consent";

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>("pending");
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted") {
      setConsentStatus("accepted");
      setShowBanner(false);
    } else if (stored === "declined") {
      setConsentStatus("declined");
      setShowBanner(false);
    } else {
      setConsentStatus("pending");
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsentStatus("accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setConsentStatus("declined");
    setShowBanner(false);
  };

  const openConsentBanner = () => {
    setShowBanner(true);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consentStatus,
        showBanner,
        acceptCookies,
        declineCookies,
        openConsentBanner,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}

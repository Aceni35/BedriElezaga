import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "./api/queryClient";
import { AuthProvider } from "./hooks/useAuth";
import { I18nProvider } from "./i18n/I18nContext";
import App from "./components/App.jsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <I18nProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast: 'rounded-xl border shadow-md',
              title: 'text-sm font-medium',
              description: 'text-xs',
            },
          }}
        />
      </BrowserRouter>
      </I18nProvider>
    </AuthProvider>
  </QueryClientProvider>
);

import { io } from "socket.io-client";
import React from "react";
import ReactDOM from "react-dom/client";
import initialstate from "./reducer/itemreducers";
import { uniquekeycheck } from "./components/dependencies";
import { Provider } from "react-redux";
import { rootReducer } from "./reducer/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createStore } from "redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
export const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Example option: number of retries
      staleTime: 1000 * 60 * 5, // Example option: cache time
    },
  },
});

try {
  uniquekeycheck(initialstate);
  console.log("All keys are unique. Proceeding to render the app.");
} catch (error) {
  console.error("Error:", error.message);
  alert("Initialization failed. Check console for details.");
  // Optionally prevent app from loading further
  throw error;
}
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default io;

import { Provider } from "@/components/ui/provider"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import SignalGenerator from "@/components/SignalGenerator"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <SignalGenerator />
    </Provider>
  </React.StrictMode>,
)
import { AnyspendProvider } from "@b3dotfun/sdk/anyspend/react";
import { useColorMode } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OnrampExamplePage from "./pages/OnrampExamplePage";
import OnrampFlowPage from "./pages/OnrampFlowPage";
import OnrampOrderStatusPage from "./pages/OnrampOrderStatusPage";

// Import SDK styles
import { B3DynamicModal, B3Provider } from "@b3dotfun/sdk/global-account/react";
import "@b3dotfun/sdk/index.css";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

const fetchGithubUser = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  return response.json();
};

function App() {
  // Just for demo @tanstack/react-query.
  // Success if console.log(data) success and anyspend working as expected.
  const { data, isLoading, error } = useQuery({
    queryKey: ["githubUser", "octocat"],
    queryFn: () => fetchGithubUser("octocat"),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <QueryClientProvider client={queryClient}>
      <B3ProviderWrapper>
        <AnyspendProvider>
          <BrowserRouter>
            <div className="b3-root min-h-screen bg-gray-100">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/onramp-example" element={<OnrampExamplePage />} />
                <Route path="/onramp" element={<OnrampFlowPage />} />
                <Route path="/onramp/status" element={<OnrampOrderStatusPage />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AnyspendProvider>
      </B3ProviderWrapper>
    </QueryClientProvider>
  );
}

function B3ProviderWrapper({ children }: { children: React.ReactNode }) {
  const { colorMode } = useColorMode();
  return (
    <B3Provider environment="production" theme={colorMode} automaticallySetFirstEoa={true}>
      <B3DynamicModal />
      {children}
    </B3Provider>
  );
}

export default App;

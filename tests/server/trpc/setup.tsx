import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import { createTRPCReact, httpLink } from "@trpc/react-query";
import { createTRPCMsw } from "msw-trpc";
import { type ReactElement } from "react";
import superjson from "superjson";
import "@testing-library/jest-dom";
import { type AppRouter } from "@/src/server/api/root";

const mockedApi = createTRPCReact<AppRouter>({
  overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn();
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});

const mockedTRPCClient = mockedApi.createClient({
  links: [
    httpLink({
      url: "http://localhost:3000/api/trpc",
      transformer: superjson,
    }),
  ],
});

const mockedQueryClient = new QueryClient();

export const MockedTRPCProvider = (props: { children: React.ReactNode }) => {
  return (
    <mockedApi.Provider
      client={mockedTRPCClient}
      queryClient={mockedQueryClient}
    >
      <QueryClientProvider client={mockedQueryClient}>
        {props.children}
      </QueryClientProvider>
    </mockedApi.Provider>
  );
};

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  return render(ui, {
    wrapper: (props) => <MockedTRPCProvider {...props} />,
    ...options,
  });
};

export const trpcMsw = createTRPCMsw<AppRouter>({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_PATH}/api/trpc`,
  transformer: {
    input: superjson,
    output: superjson,
  },
});

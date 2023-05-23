"use client";

import { Provider } from "react-redux";
import { store } from "./store";

type MyComponentProps = React.PropsWithChildren<{}>;

export function Providers({ children }: MyComponentProps) {
  return <Provider store={store}>{children}</Provider>;
}

import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import Head from "next/head";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { AppBar } from "../AppBar";
import { Text } from "../Text";
import { IconButton } from "../IconButton";
import { useTheme } from "@/providers";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { mode, setMode } = useTheme();

  return (
    <>
      <Head>
        <title>Vehicle Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar>
        <Text component="h1" variant="h3" color="inherit" flexGrow={1}>
          <FormattedMessage id="appTitle" defaultMessage="Vehicle Manager" />
        </Text>

        {/* Theme switcher. */}
        <IconButton
          color="inherit"
          icon={mode === "light" ? MoonIcon : SunIcon}
          edge="end"
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        />
      </AppBar>

      <main className="max-w-7xl p-4 mx-auto">{children}</main>
    </>
  );
};

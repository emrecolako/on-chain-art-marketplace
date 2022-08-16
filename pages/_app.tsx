import 'styles/globals.css'
import 'styles/inter.css'
import 'styles/druk.css'
import 'styles/montserrat.css'
import 'styles/open-sans.css'
import 'styles/playfair-display.css'
import 'styles/roboto.css'
import 'styles/chalkboard.css'
import 'styles/frankruhllibre.css'
import 'styles/gazpacho.css'
import 'styles/editorialnew.css'
import 'styles/lucidagrande.css'
import 'styles/nunitosans.css'
import 'styles/styreneb.css'
import 'styles/gothicusroman.css'
import 'styles/roobert.css'
import 'styles/rodger.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient, allChains, configureChains } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { GlobalProvider } from 'context/GlobalState'
import AnalyticsProvider from 'components/AnalyticsProvider'
import { ThemeProvider } from 'next-themes'
import { RecoilRoot } from 'recoil'
import {
  darkTheme,
  lightTheme,
  ReservoirKitProvider,
  ReservoirKitTheme,
} from '@reservoir0x/reservoir-kit-ui'
import { useEffect,useRef, useState } from 'react'

//0xchainart imports
import styled, { createGlobalStyle } from "styled-components"; // Styles
import Head from "next/head"; // Next head
import Link from "next/link"; // Next link
import { useRouter } from "next/router"; // Next router
import * as gtag from "../lib/gtag"; // Analytics: Google Tags

// Component imports
import Header from "../components/onchainart/Header";
import BackButton from "../components/onchainart/BackButton";
import { SidebarButtonIcon } from "../components/onchainart/Icons";
import SidebarLinks from "../components/onchainart/SidebarLinks";

// Hooks + Helpers import
import { useWindowSize, Size } from "../hooks/useWindowSize";

// Style imports
import { theme } from "../styles/theme";
const isProduction = process.env.NODE_ENV === "production";


// Select a custom ether.js interface for connecting to a network
// Reference = https://wagmi-xyz.vercel.app/docs/provider#provider-optional
// OPTIONAL
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID

// API key for Ethereum node
// Two popular services are Alchemy (alchemy.com) and Infura (infura.io)
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID

const THEME_SWITCHING_ENABLED = process.env.NEXT_PUBLIC_THEME_SWITCHING_ENABLED
const DARK_MODE_ENABLED = process.env.NEXT_PUBLIC_DARK_MODE
const RESERVOIR_API_BASE = process.env.NEXT_PUBLIC_RESERVOIR_API_BASE
const BODY_FONT_FAMILY = process.env.NEXT_PUBLIC_BODY_FONT_FAMILY || 'Inter'
const FONT_FAMILY = process.env.NEXT_PUBLIC_FONT_FAMILY || 'Inter'
const PRIMARY_COLOR = process.env.NEXT_PUBLIC_PRIMARY_COLOR || 'default'
const DISABLE_POWERED_BY_RESERVOIR =
  process.env.NEXT_PUBLIC_DISABLE_POWERED_BY_RESERVOIR
import presetColors from '../colors'

// Set up chains
const { chains, provider } = configureChains(allChains, [
  alchemyProvider({ alchemyId }),
  publicProvider(),
])

// Set up connectors
const client = createClient({
  autoConnect: true,
  provider,
  connectors: [
    new InjectedConnector({
      chains,
      options: { name: 'Injected' },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'reservoir.market',
      },
    }),
  ],
})

function MyApp({ Component, pageProps }: AppProps) {
  // States
  const [showSidebar, setShowSidebar] = useState(false);
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarButtonRef = useRef<HTMLDivElement>(null);
  const sidebarLinksRef = useRef<HTMLDivElement>(null);

  // Hooks: get window size to open or close sidebar
  const size: Size = useWindowSize();
  const router = useRouter();


  const defaultTheme = DARK_MODE_ENABLED ? 'dark' : 'light'
  const [reservoirKitTheme, setReservoirKitTheme] = useState<
    ReservoirKitTheme | undefined
  >()

  useEffect(() => {
    const primaryColor = (PRIMARY_COLOR as string) || 'default'
    const primaryColorPalette = (
      presetColors as Record<string, Record<string, string>>
    )[primaryColor]
    if (defaultTheme == 'dark') {
      setReservoirKitTheme(
        darkTheme({
          headlineFont: FONT_FAMILY,
          font: BODY_FONT_FAMILY,
          primaryColor: primaryColorPalette['700'],
          primaryHoverColor: primaryColorPalette['900'],
        })
      )
    } else {
      setReservoirKitTheme(
        lightTheme({
          headlineFont: FONT_FAMILY,
          font: BODY_FONT_FAMILY,
          primaryColor: primaryColorPalette['700'],
          primaryHoverColor: primaryColorPalette['900'],
        })
      )
    }
  }, [defaultTheme])

  useEffect(() => {
    if (size.width) {
      if (size.width < 1350) {
        setShowSidebar(false);
        return;
      }
    }
    setShowSidebar(true);
  }, [size, router]);

  // Disabling sidebar animation onload
  useEffect(() => {
    document.body.className = "preload";
    setTimeout(() => {
      document.body.className = "";
    }, 300);
  }, []);

  // Analytics
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

    /**
   * Sidebar open: click outside of sidebar, close the sidebar
   * @param {ref} sidebar ref
   * @param {function} run if clicked outside of sidebar
   */
     function useOnClickOutside(
      ref: React.RefObject<HTMLDivElement>,
      handler: (e: any) => void
    ): void {
      useEffect(() => {
        const listener = (event: any) => {
          // Do nothing if clicking sidebar or sidebar button elements
          if (
            !ref.current ||
            ref.current.contains(event.target) ||
            !sidebarButtonRef.current ||
            sidebarButtonRef.current.contains(event.target)
          ) {
            return;
          }
  
          // Close sidebar
          handler(event);
        };
  
        // Listen for mouse events.
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
  
        // Unmount listeners.
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      }, [ref, handler]);
    }


  /**
   * Check current route, return correct header
   * @returns {string} of correct header name
   */
  function getHeader(): string {
    switch (router.asPath) {
      case "/info":
        return "About On-Chain";
        break;
      case "/readings":
        return "Readings";
        break;
      case "/submit":
        return "Submit Collection";
        break;
      case "/cc0":
        return "CC0";
        break;
      default:
        return router.asPath;
    }
  }

    /**
   * Renders correct header UI
   * @returns {JSX.Element | undefined} header element or undefined if no correct header
   */
     function renderHeaders(): JSX.Element | undefined {
      if (router.asPath !== "/" && !router.asPath.includes("/collection/")) {
        return <Header show={showSidebar} headings={getHeader()} />;
      } else if (router.asPath.includes("/collection")) {
        return <BackButton />;
      }
    }

    // Add mouseDown listener to sideBar ref.
    useOnClickOutside(sidebarRef, () => setShowSidebar(false));



  return (
    <ReservoirKitProvider
      options={{
        apiBase: RESERVOIR_API_BASE || '',
        disablePoweredByReservoir:
          DISABLE_POWERED_BY_RESERVOIR != undefined &&
          DISABLE_POWERED_BY_RESERVOIR != null,
      }}
      theme={reservoirKitTheme}
    >
      <GlobalProvider>
        <RecoilRoot>
          <WagmiConfig client={client}>
            <AnalyticsProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme={defaultTheme}
                forcedTheme={
                  !THEME_SWITCHING_ENABLED ? defaultTheme : undefined
                }
              >
                <Component {...pageProps} />
              </ThemeProvider>
            </AnalyticsProvider>
          </WagmiConfig>
        </RecoilRoot>
      </GlobalProvider>
    </ReservoirKitProvider>
  )
}

export default MyApp

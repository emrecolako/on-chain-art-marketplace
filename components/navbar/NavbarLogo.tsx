import Link from 'next/link'
import { FC } from 'react'

const NAVBAR_LOGO = process.env.NEXT_PUBLIC_NAVBAR_LOGO
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const SOURCE_ID = process.env.NEXT_PUBLIC_SOURCE_ID
const DESKTOP_NAVBAR_LOGO = process.env.NEXT_PUBLIC_DESKTOP_NAVBAR_LOGO
const NAVBAR_LOGO_LINK = process.env.NEXT_PUBLIC_NAVBAR_LOGO_LINK

type Props = {
  variant?: 'desktop' | 'mobile' | undefined
  className?: string
}

const NavbarLogo: FC<Props> = ({ variant, className }) => {
  const logo = NAVBAR_LOGO || '/reservoir.svg'
  const desktopLogo = DESKTOP_NAVBAR_LOGO || '/onchain.svg'
  const logoAlt = SOURCE_ID ? `${SOURCE_ID} Logo` : 'Reservoir Logo'
  const mobileVariant = variant == 'mobile'
  const desktopVariant = variant == 'desktop'
  const isTestNet = CHAIN_ID === '4'

  return (
    <Link href={NAVBAR_LOGO_LINK || '/'}>
      <a
        className={`relative inline-flex flex-none items-center gap-1 ${className}`}
      >
        <header>
            <Link href="/" passHref>
              <h1>On-Chain Art Marketplace</h1>
            </Link>
          </header>
        {/* <img
          src={logo}
          alt={logoAlt}
          className={`h-9 w-auto ${!variant ? 'md:hidden' : ''} ${
            desktopVariant ? 'hidden' : ''
          } ${mobileVariant ? 'block' : ''}`}
        />
        <img
          src={desktopLogo}
          alt={logoAlt}
          className={`h-9 w-auto md:block ${
            !variant ? 'hidden md:block' : ''
          } ${mobileVariant ? 'hidden' : ''} ${desktopVariant ? 'block' : ''}`}
        /> */}
        {isTestNet && (
          <div
            className={`reservoir-tiny inline rounded-[4px] bg-[#EFC45C] p-1 py-[2px]
          ${
            !variant || desktopVariant
              ? 'md:absolute md:left-[-50px] md:bottom-[8px]'
              : ''
          }
          `}
          >
            Testnet
          </div>
        )}
      </a>
    </Link>
  )
}

export default NavbarLogo

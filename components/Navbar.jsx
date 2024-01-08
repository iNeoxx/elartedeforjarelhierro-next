"use client"
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./Navbar.module.css";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const menuItems = [
    "Blog",
    "Catalogo",
    "Acerca del Sitio",
  ];

  return (
    <Navbar maxWidth="full" className="pt-3" isBlurred={false} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link href="/">
          <NavbarBrand>
            <Image
              src="/logonavbar.svg"
              width={93}
              height={100}
              alt="icon"
            />
          </NavbarBrand>
        </Link>
      </NavbarContent>
      <NavbarContent className="font-bold gap-10" justify="end">
        <NavbarItem className={`hover:text-[#C93400] hover:transition duration-100 hidden sm:flex`}>
          <Link href="/" className={styles.underline_style}>
            Inicio
          </Link>
        </NavbarItem>
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            className={`hover:text-[#C93400] hover:transition duration-100 hidden sm:flex ${router.asPath === `/${item.toLowerCase().replace(/\s/g, '-')}` ||
              router.asPath.startsWith(`/${item.toLowerCase().replace(/\s/g, '-')}/`)
              ? "text-[#C93400]"
              : ""
              }`}
          >
            <Link
              color="foreground"
              className={`w-full ${styles.underline_style}`}
              href={`/${item.toLowerCase().replace(/\s/g, '-')}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Button
            as={Link}
            className={styles.contact_button}
            href="/contacto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="19"
              viewBox="0 0 22 19"
              fill="none"
            >
              <path
                d="M6.97728 7.58491H6.98763M11.1169 7.58491H11.1273M15.2566 7.58491H15.2669M8.01219 13.2453H3.87255C3.3236 13.2453 2.79714 13.0465 2.40897 12.6927C2.0208 12.3388 1.80273 11.8589 1.80273 11.3585V3.81133C1.80273 3.31092 2.0208 2.83101 2.40897 2.47717C2.79714 2.12332 3.3236 1.92454 3.87255 1.92454H18.3613C18.9102 1.92454 19.4367 2.12332 19.8249 2.47717C20.213 2.83101 20.4311 3.31092 20.4311 3.81133V11.3585C20.4311 11.8589 20.213 12.3388 19.8249 12.6927C19.4367 13.0465 18.9102 13.2453 18.3613 13.2453H13.1867L8.01219 17.9623V13.2453Z"
                fill="white"
                stroke="#C93400"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Contacto
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="bg-gradient-to-b from-white via-slate-100 to-red-50 h-screen font-semibold mt-9 text-center">
        <NavbarMenuItem className="py-3 hover:text-[#C93400] hover:transition duration-100 text-2xl">
          <Link className={`${styles.underline_style} py-[2px]`} href="/">
            Inicio
          </Link>
        </NavbarMenuItem>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="py-3 hover:text-[#C93400] hover:transition duration-100">
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className={`w-full text-2xl py-[4px] ${styles.underline_style}`}
              href={`/${item.toLowerCase().replace(/\s/g, '-')}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}


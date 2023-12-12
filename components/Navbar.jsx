"use client"
import Link from "next/link"
import Image from "next/image"
import React from "react";
import styles from "./Navbar.module.css"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
    const menuItems = [
      "Blog",
      "Catalogo",
      "Acerca de",
    ];
  
    return (
      <Navbar maxWidth="full" className="pt-3" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <Link href="/">
          <NavbarBrand>
            <Image
            src= "/logonavbar.svg"
            width={93}
            height={100}
            alt="icon"
            />
          </NavbarBrand>
          </Link>
        </NavbarContent>
        <NavbarContent className="font-bold gap-10" justify="end">
        <NavbarItem className="hidden sm:flex">
            <Link color="foreground" href="/blog">
              Blog
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
          <Link color="foreground" href="/catalogo">
              Catalogo
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Link color="foreground" href="/acerca-de-nosotros">
              Acerca De Nosotros
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} className={styles.contact_button} href="/contacto">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
            <g clip-path="url(#clip0_184_546)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5012 4.81135V12.3585C19.5012 12.8589 19.2831 13.3388 18.8949 13.6927C18.5068 14.0465 17.9803 14.2453 17.4314 14.2453H12.2568L7.08226 18.0189V14.2453H5.01245C4.4635 14.2453 3.93703 14.0465 3.54886 13.6927C3.1607 13.3388 2.94263 12.8589 2.94263 12.3585V4.81135C2.94263 4.31094 3.1607 3.83103 3.54886 3.47719C3.93703 3.12335 4.4635 2.92456 5.01245 2.92456H17.4314C17.9803 2.92456 18.5068 3.12335 18.8949 3.47719C19.2831 3.83103 19.5012 4.31094 19.5012 4.81135ZM8.11717 7.64154H6.04736V9.52833H8.11717V7.64154ZM10.187 7.64154H12.2568V9.52833H10.187V7.64154ZM16.3965 7.64154H14.3266V9.52833H16.3965V7.64154Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_184_546">
            <rect width="20.6982" height="18.8679" fill="white" transform="translate(0.872803 0.0943604)"/>
            </clipPath>
            </defs>
            </svg>
              Contacto
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    );
  }
  
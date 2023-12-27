import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { DrupalTaxonomyTerm } from "next-drupal";
import Link from "next/link";
import styles from "./Catalogue.module.css"
interface DropdownInterface {
    tags: DrupalTaxonomyTerm[]
}

export default function CatalogueDropdown({tags, ...props}: DropdownInterface) {
  const items = tags.map((tag) => (
    {
      name:  tag.name,
      path: tag.path.alias
    }
  ))

  return (
    <div className="flex max-[1024px]:order-last">
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button className={styles.categoryDropdown} variant="bordered">
          Categoria
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19.9201 8.95001L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95001" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem key={item.name} style={{ width: '100%' }}>
            <Link href={item.path} style={{ display: 'block', width: '100%', padding: '8px' }}>
              {item.name}
            </Link>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
    </div>
  );
}

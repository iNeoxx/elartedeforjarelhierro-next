import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { DrupalTaxonomyTerm } from "next-drupal";
import Link from "next/link";

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
  console.log("************ TAGS DESDE EL ITEMS *********************")
    console.log(items)

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Open Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
          key={item.name}
        >
          <Link href={item.path}>
          
            {item.name}
          
          </Link>
          </DropdownItem>
          
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

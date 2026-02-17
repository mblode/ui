"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "blode-icons-react";

import { Button } from "@/registry/default/ui/button";
import { ButtonGroup } from "@/registry/default/ui/button-group";

export default function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button size="sm" variant="outline">
          1
        </Button>
        <Button size="sm" variant="outline">
          2
        </Button>
        <Button size="sm" variant="outline">
          3
        </Button>
        <Button size="sm" variant="outline">
          4
        </Button>
        <Button size="sm" variant="outline">
          5
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Previous" size="icon-sm" variant="outline">
          <ArrowLeftIcon />
        </Button>
        <Button aria-label="Next" size="icon-sm" variant="outline">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}

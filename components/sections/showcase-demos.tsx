"use client";

import {
  Calendar,
  CheckCircle2Icon,
  ChevronsUpDown,
  EmojiSmileIcon,
  FolderIcon,
} from "blode-icons-react";
import Link from "next/link";
import type React from "react";
import { Fragment, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/registry/default/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb";
import { Button } from "@/registry/default/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/registry/default/ui/card";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup, CheckboxGroupLabel } from "@/registry/default/ui/checkbox-group";
import { CircularProgress } from "@/registry/default/ui/circular-progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/default/ui/command";
import { CurrencyInput } from "@/registry/default/ui/currency-input";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";
import { Field, FieldDescription, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/registry/default/ui/item";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";
import { Label } from "@/registry/default/ui/label";
import { MultiCombobox } from "@/registry/default/ui/multi-combobox";
import type { MultiComboboxOption } from "@/registry/default/ui/multi-combobox";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/default/ui/navigation-menu";
import { Prompt } from "@/registry/default/ui/prompt";
import { ScrollArea } from "@/registry/default/ui/scroll-area";
import { Separator } from "@/registry/default/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";

function AccordionShowcase() {
  return (
    <Accordion className="w-64" defaultValue={["shipping"]}>
      <AccordionItem value="shipping">
        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
        <AccordionContent>Standard, express, and overnight shipping available.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function AlertShowcase() {
  return (
    <Alert className="w-72">
      <CheckCircle2Icon />
      <AlertTitle>Payment successful</AlertTitle>
      <AlertDescription>Your payment of $29.99 has been processed.</AlertDescription>
    </Alert>
  );
}

function AvatarShowcase() {
  return (
    <Avatar className="size-12">
      <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

function BadgeShowcase() {
  return (
    <div className="flex gap-2">
      <Badge>Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
    </div>
  );
}

function BreadcrumbShowcase() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/docs">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/docs/components">Components</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function CardShowcase() {
  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login.</CardDescription>
      </CardHeader>
    </Card>
  );
}

function CheckboxShowcase() {
  return (
    <Field className="w-auto" orientation="horizontal">
      <Checkbox defaultChecked id="sc-checkbox" />
      <Label htmlFor="sc-checkbox">Accept terms</Label>
    </Field>
  );
}

function CheckboxGroupShowcase() {
  return (
    <CheckboxGroup className="w-auto" defaultValue={["fuji"]}>
      <CheckboxGroupLabel>Apples</CheckboxGroupLabel>
      <div className="flex items-center gap-2 text-sm">
        <Checkbox id="sc-cg-fuji" value="fuji" />
        <label htmlFor="sc-cg-fuji">Fuji</label>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Checkbox id="sc-cg-gala" value="gala" />
        <label htmlFor="sc-cg-gala">Gala</label>
      </div>
    </CheckboxGroup>
  );
}

function CircularProgressShowcase() {
  return <CircularProgress className="size-24" value={66} />;
}

function CollapsibleShowcase() {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible className="flex w-60 flex-col gap-2" onOpenChange={setOpen} open={open}>
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-semibold text-sm">Order #4189</h4>
        <CollapsibleTrigger render={<Button className="size-8" size="icon" variant="ghost" />}>
          <ChevronsUpDown />
          <span className="sr-only">Toggle</span>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="rounded-md border px-4 py-2 text-muted-foreground text-sm">
        2× Studio Headphones
      </CollapsibleContent>
    </Collapsible>
  );
}

function CommandShowcase() {
  return (
    <Command className="w-64 rounded-lg border">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <EmojiSmileIcon />
            <span>Search Emoji</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function CurrencyInputShowcase() {
  const [value, setValue] = useState<string | undefined>("29.00");

  return (
    <Field className="w-64">
      <FieldLabel htmlFor="sc-currency">Monthly price</FieldLabel>
      <CurrencyInput
        decimalsLimit={2}
        id="sc-currency"
        onValueChange={(next) => setValue(next)}
        prefix="$"
        value={value}
      />
    </Field>
  );
}

function EmptyShowcase() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Create Project</Button>
      </EmptyContent>
    </Empty>
  );
}

function FieldShowcase() {
  return (
    <Field className="w-64">
      <FieldLabel htmlFor="sc-field">Name on Card</FieldLabel>
      <Input id="sc-field" placeholder="Evil Rabbit" />
      <FieldDescription>Secure and encrypted.</FieldDescription>
    </Field>
  );
}

function ItemShowcase() {
  return (
    <Item className="w-64" variant="outline">
      <ItemContent>
        <ItemTitle>Basic Item</ItemTitle>
        <ItemDescription>A simple item with a description.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Action
        </Button>
      </ItemActions>
    </Item>
  );
}

function KbdShowcase() {
  return (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <span>+</span>
      <Kbd>B</Kbd>
    </KbdGroup>
  );
}

const MULTI_COMBOBOX_FRAMEWORKS: MultiComboboxOption[] = [
  { id: "next.js", label: "Next.js" },
  { id: "remix", label: "Remix" },
  { id: "astro", label: "Astro" },
  { id: "react", label: "React" },
];

function MultiComboboxShowcase() {
  return (
    <div className="w-64">
      <MultiCombobox options={MULTI_COMBOBOX_FRAMEWORKS} placeholder="Select frameworks..." />
    </div>
  );
}

function NavigationMenuShowcase() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-56 p-1">
              <li>
                <NavigationMenuLink render={<Link href="#" />}>Introduction</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink render={<Link href="#" />}>Installation</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="#" />}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function PromptShowcase() {
  return (
    <Prompt>
      <Prompt.Trigger asChild>
        <Button variant="destructive">Delete workspace</Button>
      </Prompt.Trigger>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Delete workspace?</Prompt.Title>
          <Prompt.Description>This action cannot be undone.</Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel>Cancel</Prompt.Cancel>
          <Prompt.Action>Delete workspace</Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
}

const SCROLL_TAGS = ["v1.2.0", "v1.1.0", "v1.0.0", "v0.9.0", "v0.8.0", "v0.7.0"];

function ScrollAreaShowcase() {
  return (
    <ScrollArea className="h-40 w-44 rounded-md border">
      <div className="p-4">
        <h4 className="mb-2 font-medium text-sm leading-none">Tags</h4>
        {SCROLL_TAGS.map((tag) => (
          <Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}

function TableShowcase() {
  return (
    <Table className="w-64">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function TabsShowcase() {
  return (
    <Tabs className="w-64" defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent className="pt-3 text-muted-foreground text-sm" value="overview">
        12 active projects and 3 pending tasks.
      </TabsContent>
      <TabsContent className="pt-3 text-muted-foreground text-sm" value="analytics">
        Page views are up 25% this month.
      </TabsContent>
    </Tabs>
  );
}

// Showcase-only minimal demos, keyed by component slug. These override the
// busier canonical `*-demo` examples in the home grid without changing the
// demos used on the docs pages. Components not listed here already render a
// single, minimal instance, so they reuse their canonical demo.
export const showcaseDemos: Record<string, React.ComponentType> = {
  accordion: AccordionShowcase,
  alert: AlertShowcase,
  avatar: AvatarShowcase,
  badge: BadgeShowcase,
  breadcrumb: BreadcrumbShowcase,
  card: CardShowcase,
  checkbox: CheckboxShowcase,
  "checkbox-group": CheckboxGroupShowcase,
  "circular-progress": CircularProgressShowcase,
  collapsible: CollapsibleShowcase,
  command: CommandShowcase,
  "currency-input": CurrencyInputShowcase,
  empty: EmptyShowcase,
  field: FieldShowcase,
  item: ItemShowcase,
  kbd: KbdShowcase,
  "multi-combobox": MultiComboboxShowcase,
  "navigation-menu": NavigationMenuShowcase,
  prompt: PromptShowcase,
  "scroll-area": ScrollAreaShowcase,
  table: TableShowcase,
  tabs: TabsShowcase,
};

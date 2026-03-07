import type { Registry } from "shadcn/schema";

interface RegistryFontDefinition {
  family: string;
  import: string;
  name: string;
  subsets?: string[];
  title: string;
  variable: "--font-mono" | "--font-sans" | "--font-serif";
}

const REGISTRY_FONTS: RegistryFontDefinition[] = [
  {
    name: "font-geist",
    title: "Geist",
    family: "'Geist Variable', sans-serif",
    import: "Geist",
    variable: "--font-sans",
    subsets: ["latin"],
  },
  {
    name: "font-inter",
    title: "Inter",
    family: "'Inter Variable', sans-serif",
    import: "Inter",
    variable: "--font-sans",
    subsets: ["latin"],
  },
  {
    name: "font-noto-sans",
    title: "Noto Sans",
    family: "'Noto Sans Variable', sans-serif",
    import: "Noto_Sans",
    variable: "--font-sans",
  },
  {
    name: "font-nunito-sans",
    title: "Nunito Sans",
    family: "'Nunito Sans Variable', sans-serif",
    import: "Nunito_Sans",
    variable: "--font-sans",
  },
  {
    name: "font-figtree",
    title: "Figtree",
    family: "'Figtree Variable', sans-serif",
    import: "Figtree",
    variable: "--font-sans",
    subsets: ["latin"],
  },
  {
    name: "font-roboto",
    title: "Roboto",
    family: "'Roboto Variable', sans-serif",
    import: "Roboto",
    variable: "--font-sans",
    subsets: ["latin"],
  },
  {
    name: "font-raleway",
    title: "Raleway",
    family: "'Raleway Variable', sans-serif",
    import: "Raleway",
    variable: "--font-sans",
    subsets: ["latin"],
  },
  {
    name: "font-dm-sans",
    title: "DM Sans",
    family: "'DM Sans Variable', sans-serif",
    import: "DM_Sans",
    variable: "--font-sans",
    subsets: ["latin"],
  },
  {
    name: "font-public-sans",
    title: "Public Sans",
    family: "'Public Sans Variable', sans-serif",
    import: "Public_Sans",
    variable: "--font-sans",
    subsets: ["latin"],
  },
  {
    name: "font-outfit",
    title: "Outfit",
    family: "'Outfit Variable', sans-serif",
    import: "Outfit",
    variable: "--font-sans",
    subsets: ["latin"],
  },
  {
    name: "font-jetbrains-mono",
    title: "JetBrains Mono",
    family: "'JetBrains Mono Variable', monospace",
    import: "JetBrains_Mono",
    variable: "--font-mono",
    subsets: ["latin"],
  },
  {
    name: "font-geist-mono",
    title: "Geist Mono",
    family: "'Geist Mono Variable', monospace",
    import: "Geist_Mono",
    variable: "--font-mono",
    subsets: ["latin"],
  },
  {
    name: "font-noto-serif",
    title: "Noto Serif",
    family: "'Noto Serif Variable', serif",
    import: "Noto_Serif",
    variable: "--font-serif",
    subsets: ["latin"],
  },
  {
    name: "font-roboto-slab",
    title: "Roboto Slab",
    family: "'Roboto Slab Variable', serif",
    import: "Roboto_Slab",
    variable: "--font-serif",
    subsets: ["latin"],
  },
  {
    name: "font-merriweather",
    title: "Merriweather",
    family: "'Merriweather Variable', serif",
    import: "Merriweather",
    variable: "--font-serif",
    subsets: ["latin"],
  },
  {
    name: "font-lora",
    title: "Lora",
    family: "'Lora Variable', serif",
    import: "Lora",
    variable: "--font-serif",
    subsets: ["latin"],
  },
  {
    name: "font-playfair-display",
    title: "Playfair Display",
    family: "'Playfair Display Variable', serif",
    import: "Playfair_Display",
    variable: "--font-serif",
    subsets: ["latin"],
  },
];

function createGoogleFontRegistryItem(
  definition: RegistryFontDefinition
): Registry["items"][number] {
  return {
    name: definition.name,
    title: definition.title,
    type: "registry:font",
    font: {
      family: definition.family,
      provider: "google",
      import: definition.import,
      variable: definition.variable,
      ...(definition.subsets ? { subsets: definition.subsets } : {}),
    },
  };
}

export const fonts: Registry["items"] = REGISTRY_FONTS.map(
  createGoogleFontRegistryItem
);

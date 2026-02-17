const fs = require("node:fs");
const path = require("node:path");

// Path to the directory containing all icon files
const iconsDir = path.join(
  import.meta.dirname,
  "node_modules",
  "blode-icons-react",
  "dist"
);

// Read all files in the directory
fs.readdir(iconsDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // Filter for JavaScript files that likely contain icon exports
  const iconFiles = files.filter(
    (file) => file.endsWith(".js") && !file.includes("index")
  );

  // Extract icon names from filenames
  const iconNames = iconFiles.map((file) => {
    // Convert from kebab-case to PascalCase and add "Icon" suffix
    const baseName = file.replace(".js", "");
    const pascalCase = baseName
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
    return `${pascalCase}Icon`;
  });

  // Sort the icon names alphabetically
  iconNames.sort();

  // Print all icon names
  console.log("Available icons in blode-icons-react:");
  for (const icon of iconNames) {
    console.log(icon);
  }
  console.log(`Total icons: ${iconNames.length}`);
});

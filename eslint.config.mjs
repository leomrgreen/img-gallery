import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

const config = {
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-wrapper-object-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn",
  },
};

// Combine ESLint extends and custom rules
export default {
  ...eslintConfig,
  ...config,
};

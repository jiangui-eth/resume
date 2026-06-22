import antfu from "@antfu/eslint-config";

export default antfu(
  {
    react: true,
    typescript: true,
    stylistic: false,
    ignores: [
      "**/package.json",
      "**/test-results/**",
      "**/playwright-report/**",
      "**/storybook-static/**",
      "**/.next/**",
    ],
  },
  {
    rules: {
      "node/prefer-global/process": "off",
      "antfu/no-top-level-await": "off",
      "react-refresh/only-export-components": "off",
    },
  },
  {
    // Infra scripts run in Node.js context; console output is expected
    files: ["packages/infra/**"],
    rules: {
      "no-console": "off",
    },
  },
);

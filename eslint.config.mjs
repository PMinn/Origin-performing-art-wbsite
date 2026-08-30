import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    ignores: ["out/**", ".next/**", "scripts/**", "public/**"],
  },
];

export default eslintConfig;

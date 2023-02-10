import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const config= {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", __dirname],
  watchPathIgnorePatterns: ["dist", "coverage"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/coverage/"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};

export default config;

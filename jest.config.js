module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  automock: true,
  collectCoverage: true,
  clearMocks: true,
  setupFiles: ["reflect-metadata"],

  moduleNameMapper: {
    "^core/(.*)$": "<rootDir>/src/core/$1",
    "^infra/(.*)$": "<rootDir>/src/infra/$1",
    "^framework/(.*)$": "<rootDir>/src/framework/$1",
    "^framework/(.*)$": "<rootDir>/src/framework/$1",
  },
  coverageReporters: ["json", "html", "text"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Inclui todos os arquivos JavaScript e TypeScript no diretório 'src'
    "!src/program.ts", // Exclui um arquivo específico (por exemplo, o ponto de entrada da aplicação)
    "!src/infra/persistence/models/**", // Exclui um arquivo específico (por exemplo, o ponto de entrada da aplicação)
    "!src/infra/persistence/config/**", // Exclui um arquivo específico (por exemplo, o ponto de entrada da aplicação)
    "!src/infra/persistence/database/**", // Exclui um arquivo específico (por exemplo, o ponto de entrada da aplicação)
    "!src/infra/docs/**", // Exclui um arquivo específico (por exemplo, o ponto de entrada da aplicação)
    "!src/framework/request/**", // Exclui um arquivo específico (por exemplo, o ponto de entrada da aplicação)
    "!src/framework/validation/**", // Exclui um arquivo específico (por exemplo, o ponto de entrada da aplicação)
    "!src/framework/mapper/**", // Exclui um arquivo específico (por exemplo, o ponto de entrada da aplicação)
    "!src/core/domain/valueObject/**", // Exclui um arquivo específico (por exemplo, o ponto de entrada da aplicação)
    "!**/node_modules/**", // Exclui o diretório 'node_modules'
    "!**/vendor/**", // Exclui o diretório 'vendor' (caso exista)
  ],
  moduleDirectories: ["node_modules", "<rootDir>"],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
};

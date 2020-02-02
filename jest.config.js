module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json'
    }
  },
  rootDir: 'tests/',
  testRegex: '\\.spec\\.(js|jsx|ts|tsx)$'
};

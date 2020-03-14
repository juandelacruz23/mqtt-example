module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module',
    ecmaFeatures:  {
      jsx:  true,
    },
  },
  rules:  {
    "prefer-template": [2],
    "prettier/prettier": ["error", { "trailingComma": "all"} ],
    "react/prop-types": [0],
    "@typescript-eslint/explicit-function-return-type": ["off"]
  },
  settings:  {
    react:  {
      version:  'detect',
    },
  },
};  
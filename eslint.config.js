import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
   { ignores: ['dist'] },
   {
      files: ['**/*.{js,jsx}'],
      languageOptions: {
         ecmaVersion: 2020,
         globals: globals.browser,
         parserOptions: {
            ecmaVersion: 'latest',
            ecmaFeatures: { jsx: true },
            sourceType: 'module'
         }
      },
      plugins: {
         react,
         'simple-import-sort': simpleImportSort,
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh
      },
      rules: {
         ...js.configs.recommended.rules,
         ...reactHooks.configs.recommended.rules,
         'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
         'react-refresh/only-export-components': 'off',
         semi: ['error', 'always'],
         quotes: ['error', 'single'],
         'react/prop-types': 'off',

         // 🔥 Import sort rules here:
         'simple-import-sort/imports': [
            'error',
            {
               groups: [
                  ['^\\u0000'], // 1. Side-effect imports
                  ['^react', '^next'], // 2. React / Next
                  ['^@?\\w'], // 3. Third-party packages
                  ['^types$'], // 4. Exact "types" import
                  ['^@/env', '^@/types', '^@/config', '^@/lib', '^@/hooks'], // 5. Internal core modules
                  ['^@/components/ui'], // 6. UI components
                  ['^@/components'], // 7. Other components
                  ['^@/styles'], // 8. Styles
                  ['^@/app'], // 9. Pages or routes
                  ['^\\.'] // 10. Relative imports
               ]
            }
         ],
         'simple-import-sort/exports': 'error'
      }
   }
];

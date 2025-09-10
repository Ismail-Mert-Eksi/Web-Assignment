// eslint.config.mjs
// @ts-check
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  // 0) Ignore build artifacts & misc
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'eslint.config.mjs',
      // 'test/**', // ← testleri tamamen hariç tutmak istersen bunu aç ve test override bloğunu sil
    ],
  },

  // 1) Base + TS (type-checked) for /src
  {
    files: ['src/**/*.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      globals: { ...globals.node },
      sourceType: 'commonjs',
      parserOptions: {
        // TS-ESLint v7+ için:
        projectService: true,
        tsconfigRootDir: import.meta.dirname,

        // Eğer sürümün 'projectService'i desteklemiyorsa, bunun yerine:
        // project: ['./tsconfig.json'],
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },

  // 2) (Opsiyonel) /test için override — testleri lint'lemeye devam et ama katı "unsafe" kuralları kapat
  {
    files: ['test/**/*.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },

  // 3) Prettier — HER ZAMAN en sonda
  prettier,
)

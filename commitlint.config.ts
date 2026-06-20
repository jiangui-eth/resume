import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'build',
        'ci',
        'revert',
      ],
    ],
    'scope-enum': [
      1,
      'always',
      [
        'web',
        'storybook',
        'ui',
        'api',
        'env',
        'infra',
        'config',
        'deps',
        'release',
        'faq-bot',
        'i18n',
      ],
    ],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  },
}

export default config

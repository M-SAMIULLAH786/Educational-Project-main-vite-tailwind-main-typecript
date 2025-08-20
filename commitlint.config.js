module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // e.g., allow any subject (not recommended unless you understand consequences)
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never']
  }
}

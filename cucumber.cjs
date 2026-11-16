module.exports = {
  default: {
    paths: ['features/*.feature'],
    require: ['features/step_definitions/*.cjs'],
    format: ['progress-bar', 'html:cucumber-report.html']
  }
};
/**
 * This file is part of cucumber-report-for-email
 */

import { DateTime } from 'luxon';
import EmailGenerator from './src/email_generator';
import path from 'path';
import { readJson } from './src/file_reader';

/**
 * To call the email report generator from external command
 * NOTE: This file should be at root of service that needs to use it.
 */
async function main() {
  console.log('Running Email Reports for Titan.');;
  const configsPath = path.join(process.cwd(), 'configs.local.json');
  const configs = readJson(configsPath);
  await EmailGenerator.generate(
    configs.pipelineUrl,
    process.env['PIPELINE_EXEC_NUMBER'] || '',
    configs.dashboardUrl,
    'titan',
    configs.title,
    configs.bugsBaseUrl
  );
  if (configs['smtp']['sendEmail']) {
    await EmailGenerator.sendEmailAsHtml(
      configs['smtp']['from'],
      process.env['EMAIL_TO'] || configs['smtp']['to'],
      `Titan Automation Pipeline Execution - ${DateTime.now().toFormat('LL/dd/yyyy')}`,
      configs['smtp']
    );
  }
};

main();

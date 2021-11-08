import { execSync } from 'child_process';
import { readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { URL } from 'url';

const dirname = new URL('.', import.meta.url).pathname;

const postHtmlConfigFile = join(dirname, '../.posthtmlrc');
const postHtmlConfigFileTemplate = `${postHtmlConfigFile}.template`;
const postHtmlConfigFileTemplateContent = readFileSync(
  postHtmlConfigFileTemplate,
  'utf8',
);

const translationDir = join(dirname, '../src/translations');
const translationFiles = readdirSync(translationDir);

translationFiles.forEach((translationFile) => {
  const translationName = translationFile.split('.')[0];

  const translationJson = readFileSync(
    join(translationDir, translationFile),
    'utf8',
  );

  writeFileSync(
    postHtmlConfigFile,
    postHtmlConfigFileTemplateContent.replace('TRANSLATIONS', translationJson),
  );

  execSync(`npm run build-parcel -- --dist-dir ./dist/${translationName}`);

  unlinkSync(postHtmlConfigFile);
});

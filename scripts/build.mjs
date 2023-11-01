import { execSync } from 'child_process';
import { readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { URL } from 'url';
import { argv } from 'process';

const getJson = (path) => JSON.parse(readFileSync(path, 'utf-8'));

const getArgv = (key) => {
  const value = argv.find((element) => element.startsWith(`--${key}=`));

  if (!value) {
    return null;
  }

  return value.replace(`--${key}=`, '');
};

const dirname = new URL('.', import.meta.url).pathname;
const defaultLang = 'en';

const postHtmlConfigFile = join(dirname, '../.posthtmlrc');
const postHtmlConfigFileTemplate = `${postHtmlConfigFile}.template`;
const postHtmlConfigFileTemplateContent = readFileSync(
  postHtmlConfigFileTemplate,
  'utf8',
);
const packageJson = getJson(join(dirname, '../package.json'));

const translationDir = join(dirname, '../src/translations');
const translationFiles = readdirSync(translationDir);

translationFiles.forEach((translationFile) => {
  const translationName = translationFile.split('.')[0];

  const translationJson = getJson(join(translationDir, translationFile));
  translationJson.version = packageJson.version;

  writeFileSync(
    postHtmlConfigFile,
    postHtmlConfigFileTemplateContent.replace(
      'TRANSLATIONS',
      JSON.stringify(translationJson),
    ),
  );

  const isDefaultLang = translationName === defaultLang;

  const distDir = join(
    dirname,
    '../dist/',
    isDefaultLang ? '' : translationName,
  );

  const publicUrl = `${getArgv('url') ?? ''}${
    isDefaultLang ? '/' : `/${translationName}/`
  }`;

  execSync(
    `npm run build:parcel -- --dist-dir ${distDir} --public-url ${publicUrl}`,
  );

  unlinkSync(postHtmlConfigFile);
});

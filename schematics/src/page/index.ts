import { Rule, SchematicContext, Tree, mergeWith, url, apply, template, chain, move, SchematicsException } from '@angular-devkit/schematics';
import { IPageOptions } from './options';
import { strings, normalize } from '@angular-devkit/core';
import { getWorkspaceConfig, getDefaultPath } from '../util/wokrspace';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';

export function page(options: IPageOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const { alias, path } = options;
    const workspace = getWorkspaceConfig(host);
    let name = options.name.replace(/(page|Page)$/, '');
    const config = {
      name: strings.dasherize(name),
      alias: alias || makePageIdFromName(name),
      path: normalize(`${getDefaultPath(workspace)}/${path}`)
    }

    context.logger.info(`Create page ${config.name} with alias ${config.alias}`);

    return chain([
      addTemplates(config),
      appendToPageConfig(makeConfigForPage(name, config.alias), config.path)
    ])(host, context);
  };
}

function makePageIdFromName(name: string)
{
  return strings.camelize(strings.dasherize(name)) + "Page";
}

function addTemplates(options: IPageOptions) {
  const templates = url('./files');
  const rendered = apply(templates, [
    template({...options, ...strings}),
    move(options.path)
  ]);

  return mergeWith(rendered);
}

function appendToPageConfig(insert: string, path: string)
{
  return (host: Tree) => {
    const pathToPagesConfig = normalize(`${path}/pages.ts`)
    const file = host.read(pathToPagesConfig);

    if (!file) throw new SchematicsException(`Can't find ${path}/pages.ts`);

    const str = file.toString();
    const position = str.length - 2;
    const updated = [str.slice(0, position), insert, str.slice(position)].join('');

    host.overwrite(pathToPagesConfig, updated);

    return host;
  }
}

function makeConfigForPage(name: string, id: string) {
  let dasherizedName = dasherize(name);
  return `
    {
        id: '${id}',
        path: '__dynamic__',
        loadChildren: './ui/pages/${dasherizedName}/${dasherizedName}-page.module#${classify(name + "PageModule")}'
    },\n`;
}
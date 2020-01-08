import { Rule, SchematicContext, Tree, mergeWith, url, apply, template, chain, move, SchematicsException } from '@angular-devkit/schematics';
import { IPanelOptions } from './options';
import { strings, normalize } from '@angular-devkit/core';
import { getWorkspaceConfig, getDefaultPath } from '../util/wokrspace';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';

export function panel(options: IPanelOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const { alias, path } = options;
    const workspace = getWorkspaceConfig(host);
    let name = options.name.replace(/(panel|Panel)$/, '');
    const config = {
      name: strings.dasherize(name),
      alias: alias || makePanelIdFromName(name),
      path: normalize(`${getDefaultPath(workspace)}/${path}`)
    }

    context.logger.info(`Create panel ${config.name} with alias ${config.alias}`);

    return chain([
      addTemplates(config),
      appendToPanelConfig(makeConfigForPanel(name, config.alias), config.path)
    ])(host, context);
  };
}

function makePanelIdFromName(name: string)
{
  return strings.camelize(strings.dasherize(name)) + "Panel";
}

function addTemplates(options: IPanelOptions) {
  const templates = url('./files');
  const rendered = apply(templates, [
    template({...options, ...strings}),
    move(options.path)
  ]);

  return mergeWith(rendered);
}

function appendToPanelConfig(insert: string, path: string)
{
  return (host: Tree) => {
    const pathToPanelsConfig = normalize(`${path}/panels.ts`)
    const file = host.read(pathToPanelsConfig);

    if (!file) throw new SchematicsException(`Can't find ${path}/panels.ts`);

    const str = file.toString();
    const position = str.length - 2;
    const updated = [str.slice(0, position), insert, str.slice(position)].join('');

    host.overwrite(pathToPanelsConfig, updated);

    return host;
  }
}

function makeConfigForPanel(name: string, id: string) {
  let dasherizedName = dasherize(name);
  return `
    {
        id: '${id}',
        path: '__dynamic__',
        loadChildren: './ui/panels/${dasherizedName}/${dasherizedName}-panel.module#${classify(name + "PanelModule")}'
    },\n`;
}
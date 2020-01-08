import { Rule, SchematicContext, Tree, chain, url, apply, move, mergeWith, template, MergeStrategy, SchematicsException, externalSchematic } from "@angular-devkit/schematics";
import { IUBaselineOptions } from "./options";
import { getWorkspaceConfig, getDefaultPath } from "../util/wokrspace";
import { normalize } from "path";
import { strings } from "@angular-devkit/core";
import { overwriteIfExists } from "../util/overwrite-if-exists";

export function main(options: IUBaselineOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        context.logger.info('Add UBaselineNext to project.');
        return chain([
            setup(options)
        ])(host, context);
    }
}

function setup(options: IUBaselineOptions): Rule {
    options
    return(host: Tree, context: SchematicContext) => {
        context.logger.info('Setup project')
        const workspaceConfig = getWorkspaceConfig(host);
        const defaultPath = getDefaultPath(workspaceConfig);

        return chain([
            addProxyJson(options.devHost),
            updateAngularJson(),
            addUIStructure(defaultPath),
            updateRootModules(defaultPath),
            updateAppComponent(defaultPath),
            updatePackageJson(),
            externalSchematic('@schematics/angular' , 'component', {path: 'src/app/ui/main-layout', name: 'header', module: 'app.module', prefix: 'app'}),
            externalSchematic('@schematics/angular' , 'component', {path: 'src/app/ui/main-layout', name: 'footer', module: 'app.module', prefix: 'app'}),
            updateMainStyles(),
            addBuildScripts()
        ])(host, context);
    }
}

function updateMainStyles(): Rule {
    return (host: Tree, context: SchematicContext) => {
        const templates = url('./files/less');
            const rendered = apply(templates, [
                template({}),
                move('src'),
                overwriteIfExists(host)
            ]);

        return mergeWith(rendered, MergeStrategy.Overwrite)(host, context);
    };
}

function addBuildScripts() {
    return (host: Tree, context: SchematicContext) => {
        const templates = url('./files/build-support');
        const rendered = apply(templates, [
            move('/build-support')
        ]);

        return mergeWith(rendered)(host, context);
    }
}

function updateAngularJson(): Rule {
    return (host: Tree) => {
        const file = host.read('angular.json')

        if (!file) throw new SchematicsException(`Can't found angular.json`);

        const json = JSON.parse(file.toString());

        json.projects[json.defaultProject].architect.serve.options.proxyConfig = "./proxy.json";
        json.projects[json.defaultProject].schematics = {"@schematics/angular:component": {"style": "less"}};
        json.projects[json.defaultProject].architect.build.options.stylePreprocessorOptions = {"includePaths": ["src", "node_modules"]};
        json.projects[json.defaultProject].architect.build.options.outputPath = `../../wwwroot`;
        json.projects[json.defaultProject].architect.build.options.styles = ["src/styles.less"];

        host.overwrite('angular.json', JSON.stringify(json, null, 2));

        return host;
    };
}

function updatePackageJson(): Rule {
    return (host: Tree) => {
        const file = host.read('package.json')

        if (!file) throw new SchematicsException(`Can't found package.json`);

        const json = JSON.parse(file.toString());

        json.scripts.build = "./node_modules/.bin/ng build --prod --deploy-url /wwwroot/";
        json.scripts.prebuild = 'node ./build-support/before.js';
        json.scripts.postbuild = 'node ./build-support/after.js';

        host.overwrite('package.json', JSON.stringify(json, null, 2));

        return host;
    };
}

function addProxyJson(devHost: string): Rule {
    const tpl = url('./files/proxy-config');
    const rendered = apply(tpl, [
        template({localDevelopmentHost: devHost, ...strings})
    ]);

    return mergeWith(rendered);
}

function addUIStructure(path: string): Rule {
    return mergeWith(apply(url('./files/ui'), [move(normalize(`${path}/ui`))]));
}
function updateAppComponent(path: string): Rule {
    return (host: Tree, context: SchematicContext) => {
        const templates = url('./files/app');
        const rendered = apply(templates, [
            template({}),
            move(path),
            overwriteIfExists(host)
        ]);

        return mergeWith(rendered, MergeStrategy.Overwrite)(host, context);
    }
}

function updateRootModules(path: string): Rule {
    return (host: Tree, context: SchematicContext) => {
        const templates = url('./files/root-modules');
        const rendered = apply(templates, [
            template({}),
            move(path),
            overwriteIfExists(host)
        ]);

        return mergeWith(rendered, MergeStrategy.Overwrite)(host, context);
    }
}
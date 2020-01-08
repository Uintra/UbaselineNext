import { Tree, SchematicsException } from "@angular-devkit/schematics";
import { buildDefaultPath } from "@schematics/angular/utility/project";
import { WorkspaceSchema, } from "@angular-devkit/core/src/experimental/workspace";
import { isString } from "util";

export function getWorkspaceConfig(host: Tree): WorkspaceSchema {
    const file = host.read('angular.json');

    if (!file) throw new SchematicsException(`Can't find angular.json`);

    const project = JSON.parse(file.toString()) as WorkspaceSchema;

    return project;
}

export function getDefaultPath(workspace: WorkspaceSchema): string {
    const projectName = workspace.defaultProject;

    if (isString(projectName))
    {
        const project = workspace.projects[projectName];

        return buildDefaultPath(project as any);
    }

    throw new SchematicsException(`Can't build default path for project ${projectName}`);
}
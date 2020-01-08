import { Rule, SchematicContext } from "@angular-devkit/schematics";
import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { getLatestNodeVersion, NpmRegistryPackage } from './npmjs';
import { Observable, of } from "rxjs";
import { map, concatMap } from "rxjs/operators";
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function installDependencies(): Rule {
    return (host: Tree, context: SchematicContext) => {
        context.logger.info('Installing dependencies...');
        context.addTask(new NodePackageInstallTask());

        return host;
    }
}

export function addPackageJsonDependencies(): Rule {
    return (host: Tree, context: SchematicContext): Observable<Tree> => {
      return of('@ubaseline/next').pipe(
        concatMap(name => getLatestNodeVersion(name)),
        map((npmRegistryPackage: NpmRegistryPackage) => {
          const nodeDependency: NodeDependency = {
            type: NodeDependencyType.Default,
            name: npmRegistryPackage.name,
            version: npmRegistryPackage.version,
            overwrite: false
          };
          addPackageJsonDependency(host, nodeDependency);
          context
          return host;
        })
      );
    };
  }
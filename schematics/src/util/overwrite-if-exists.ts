import { Tree, FileEntry } from "@angular-devkit/schematics/src/tree/interface";
import { Rule, forEach } from "@angular-devkit/schematics";

export function overwriteIfExists(host: Tree): Rule {
    return forEach((fileEntry: FileEntry) => {
      if (host.exists(fileEntry.path))
      {
        host.overwrite(fileEntry.path, fileEntry.content);

        return null;
      }

      return fileEntry;
    });
  }
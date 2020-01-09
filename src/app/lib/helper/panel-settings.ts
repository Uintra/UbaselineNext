import get from "lodash/get";
import { IPanelSettings } from '../core/interface/panel-settings';

export function resolveThemeCssClass(settings: IPanelSettings)
{
  let theme = get(settings, 'theme.value.alias', 'default-theme');
  let behavior = get(settings, 'behaviour.value', '');
  
  return `${theme} ${behavior}`; 
}
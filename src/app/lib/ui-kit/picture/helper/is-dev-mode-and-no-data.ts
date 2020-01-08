import { environment } from 'src/environments/environment';

export const isDevModeAndNoData = (data, fallback) => {
  return !environment.production && !data && !fallback;
}
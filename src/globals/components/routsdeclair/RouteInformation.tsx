// components/Routsdeclair/RouteInformation.ts
import { Icon as UilIcon } from '@iconscout/react-unicons';

export interface Route {
  name: string;
  path?: string;
  pathName?: string;
  topNavIcon?: string | React.ElementType;
  icon?: string | React.ElementType;
  iconSet?: string;
  pages?: Route[];
  dropdownInside?: boolean;
  permission?: string;
  active?: boolean;
  flat?: boolean;
  new?: boolean;
  hasNew?: boolean;
  isNext?: boolean;
}

export interface RouteItems {
  label: string;
  horizontalNavLabel?: string;
  icon: UilIcon;
  labelDisabled?: boolean;
  pages: Route[];
  megaMenu?: boolean;
  active?: boolean;
}

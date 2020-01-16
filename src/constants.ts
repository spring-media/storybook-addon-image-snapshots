export const ADDON_ID = 'storybookjs/imagesnapshots';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = `imageSnapshots`;

interface DisabledParameter {
  disable: boolean;
}

export type Parameters = DisabledParameter;

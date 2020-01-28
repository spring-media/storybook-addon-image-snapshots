export default {
  title: 'Playground | Viewports',
};

export const DefaultViewport = () => '<div>Default Viewport</div>';

export const MediumViewport = () => '<div>Medium Viewport</div>';
MediumViewport.story = {
  parameters: {
    viewport: {
      defaultViewport: 'medium',
    },
  },
};

export const SmallViewport = () => '<div>Small Viewport</div>';
SmallViewport.story = {
  parameters: {
    viewport: {
      defaultViewport: 'small',
    },
  },
};

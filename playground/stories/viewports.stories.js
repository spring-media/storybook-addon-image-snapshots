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

const largeElementTemplate = `
<div>
  <div 
    class="large-element" 
    style="
    background: #495057; 
    width: 900px; 
    height: 2000px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-top: 10px solid #3EB62B;
    border-bottom: 10px solid #55ACEE;
  ">
  </div>
</div>`;

export const LargeElementDefaultViewport = () => largeElementTemplate;
LargeElementDefaultViewport.story = {
  parameters: {
    imageSnapshots: {
      selector: '.large-element',
    },
  },
};

export const LargeElementMediumViewport = () => largeElementTemplate;
LargeElementMediumViewport.story = {
  parameters: {
    imageSnapshots: {
      selector: '.large-element',
    },
    viewport: {
      defaultViewport: 'medium',
    },
  },
};

export const LargeElementSmallViewport = () => largeElementTemplate;
LargeElementSmallViewport.story = {
  parameters: {
    imageSnapshots: {
      selector: '.large-element',
    },
    viewport: {
      defaultViewport: 'medium',
    },
  },
};

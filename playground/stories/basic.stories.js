export default {
  title: 'Playground | Basic',
};

export const Default = () => '<div>Hello Playground</div>';

export const Selector = () => '<div><div id="snapshot">Snapshot</div><div>No Snapshot</div></div>';
Selector.story = {
  parameters: {
    imageSnapshot: {
      selector: '#snapshot',
    },
  },
};

import PlaygroundButton from '../src/PlaygroundButton.vue';

export default {
  title: 'Playground',
};

export const BasicSnapshot = () => ({
  components: { PlaygroundButton },
  template: '<playground-button>Hello Playground</playground-button>',
});


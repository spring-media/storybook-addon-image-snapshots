import React, { ReactElement } from 'react';
import { shallow, mount } from 'enzyme';
import { ImageSnapshotPanel } from './ImageSnapshotPanel';
import { ImageSnapshot } from './ImageSnapshot';

jest.mock('./ImageSnapshot');

const getCurrentStoryData = jest.fn().mockReturnValue(null);
const getCurrentParameter = jest.fn().mockReturnValue(null);

const factory = (active = false): ReactElement => (
  <ImageSnapshotPanel
    active={active}
    getCurrentStoryData={getCurrentStoryData}
    getCurrentParameter={getCurrentParameter}
  />
);

describe('ImageSnapshotPanel', () => {
  afterEach(() => {
    getCurrentStoryData.mockReset();
    getCurrentParameter.mockReset();
  });

  it('should render nothing if active prop is equals to false', () => {
    getCurrentStoryData.mockReturnValue({});

    expect(shallow(factory()).isEmptyRender()).toBe(true);
  });

  it('should render nothing if getCurrentStoryData returns a falsy value', () => {
    expect(shallow(factory(true)).isEmptyRender()).toBe(true);
  });

  it('should render as expected', () => {
    expect.assertions(1);

    ((ImageSnapshot as unknown) as jest.Mock).mockReturnValue({
      render: function() {
        const { snapshot } = this.props;
        expect(snapshot).toBe('snapshot.png');
        return null;
      },
    });

    getCurrentStoryData.mockReturnValue({});
    getCurrentParameter.mockReturnValue({
      snapshotFileName: jest.fn(() => 'snapshot.png'),
    });

    mount(factory(true));
  });
});

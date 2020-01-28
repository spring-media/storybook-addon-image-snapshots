import React from 'react';
import { shallow } from 'enzyme';
import { ImageSnapshotPanel } from './ImageSnapshotPanel';
import { useStorybookApi, useParameter } from '@storybook/api';

jest.mock('@storybook/api');

describe('ImageSnapshotPanel', () => {
  it('should render nothing if active prop is equals to false', () => {
    (useStorybookApi as jest.Mock).mockReturnValueOnce(() => ({
      getCurrentStoryData: () => {},
    }));

    (useParameter as jest.Mock).mockReturnValueOnce(() => ({
      snapshot: null,
    }));

    expect(shallow(<ImageSnapshotPanel active={false} />).isEmptyRender()).toBe(true);
  });
});

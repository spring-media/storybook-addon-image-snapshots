import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { Placeholder } from '@storybook/components';
import { ImageSnapshot } from './ImageSnapshot';
import { PARAM_KEY } from '../constants';

export interface ImageSnapshotPanelProps {
  active: boolean;
  getCurrentStoryData: () => Partial<StoryData>;
  getCurrentParameter: (param: string) => ImageSnapshotStoryParameters;
}

export type StoryData = {
  id: string;
  name: string;
  kind: string;
};

export interface ImageSnapshotStoryParameters {
  snapshotFileName: (storyData: StoryData) => string;
}

export const ImageSnapshotPanel: FunctionComponent<ImageSnapshotPanelProps> = props => {
  const { active, getCurrentStoryData, getCurrentParameter } = props;

  if (!active || !getCurrentStoryData()) {
    return null;
  }

  const data = getCurrentStoryData();
  const { snapshotFileName } = getCurrentParameter(PARAM_KEY);
  const image = snapshotFileName(data as StoryData);

  return (
    <div>
      <ImageSnapshot snapshot={image} onError={<Placeholder>No image found.</Placeholder>} />
    </div>
  );
};

ImageSnapshotPanel.propTypes = {
  active: PropTypes.bool.isRequired,
  getCurrentParameter: PropTypes.func.isRequired,
  getCurrentStoryData: PropTypes.func.isRequired,
};

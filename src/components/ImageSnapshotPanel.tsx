import React, { FunctionComponent } from 'react';
import { useParameter, useStorybookApi } from '@storybook/api';
import PropTypes from 'prop-types';
import { Placeholder } from '@storybook/components';
import { ImageSnapshot } from './ImageSnapshot';
import { PARAM_KEY } from '../constants';

export interface ImageSnapshotPanelProps {
  active: boolean;
}

export interface StoryData {
  id: string;
  name: string;
  parameters: {
    fileName: string;
    [parameterName: string]: any;
  };
}

export interface ImageSnapshotStoryParameters {
  snapshots: (storyData: StoryData) => string[];
}

export const ImageSnapshotPanel: FunctionComponent<ImageSnapshotPanelProps> = props => {
  const { active } = props;
  const { getCurrentStoryData, getParameters } = useStorybookApi();
  const { snapshots } = useParameter(PARAM_KEY, {}) as ImageSnapshotStoryParameters;

  if (!active || !getCurrentStoryData()) {
    return null;
  }

  const { id, name } = getCurrentStoryData();
  const parameters = getParameters(id);

  const snapshotList = snapshots({ id, name, parameters });

  return (
    <div>
      <ImageSnapshot snapshot={snapshotList[0]} onError={<Placeholder>No image found.</Placeholder>} />
    </div>
  );
};

ImageSnapshotPanel.propTypes = {
  active: PropTypes.bool.isRequired,
};

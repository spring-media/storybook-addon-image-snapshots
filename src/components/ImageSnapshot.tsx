import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import PropTypes from 'prop-types';

interface ImageSnapshotProps {
  snapshot: string;
}

const snapshotStyle = {
  display: 'block',
  margin: '0 auto',
};

export const ImageSnapshot: FunctionComponent<ImageSnapshotProps> = props => {
  const { snapshot } = props;

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const onError = (event: SyntheticEvent<HTMLImageElement>): void => {
    console.log(event);
  };

  const onLoaded = (event: SyntheticEvent<HTMLImageElement>): void => {
    const { target } = event;
    const { naturalWidth, naturalHeight } = target as HTMLImageElement;

    setWidth(naturalWidth / 2);
    setHeight(naturalHeight / 2);
  };

  return <img src={snapshot} onError={onError} onLoad={onLoaded} width={width} height={height} style={snapshotStyle} />;
};

ImageSnapshot.propTypes = {
  snapshot: PropTypes.string.isRequired,
};

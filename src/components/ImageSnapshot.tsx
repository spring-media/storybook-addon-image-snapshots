import React, { ReactElement, Component } from 'react';
import { ReactElementLike, Requireable, Validator } from 'prop-types';

interface ImageSnapshotProps {
  snapshot: string;
  onError?: ReactElement;
}

interface ImageSnapshotState {
  isLoaded: boolean;
  hasError: boolean;
  width: number;
  height: number;
}

const snapshotStyle = {
  display: 'block',
  margin: '0 auto',
};

export class ImageSnapshot extends Component<ImageSnapshotProps, ImageSnapshotState> {
  state: Readonly<ImageSnapshotState> = {
    isLoaded: false,
    hasError: false,
    width: 0,
    height: 0,
  };

  static propTypes: { onError: Requireable<ReactElementLike>; snapshot: Validator<NonNullable<string>> };

  onLoaded(image: HTMLImageElement): void {
    const { naturalWidth, naturalHeight } = image;

    this.setState({
      width: naturalWidth / 2,
      height: naturalHeight / 2,
      isLoaded: true,
      hasError: false,
    });
  }

  loadImage(source: string): void {
    const image = new Image();
    image.src = source;
    image
      .decode()
      .then(() => this.onLoaded(image))
      .catch(() => {
        this.setState({
          hasError: true,
        });
      });
  }

  componentDidMount(): void {
    const { snapshot } = this.props;

    this.loadImage(snapshot);
  }

  componentDidUpdate(prevProps: Readonly<ImageSnapshotProps>, prevState: Readonly<ImageSnapshotState>): void {
    const { snapshot } = this.props;
    if (prevProps.snapshot === snapshot) {
      return;
    }

    this.loadImage(snapshot);
  }

  render(): ReactElement | null {
    const { hasError, isLoaded, width, height } = this.state;
    const { onError, snapshot } = this.props;

    if (hasError && onError) {
      return onError;
    }

    if (!isLoaded || hasError) {
      return null;
    }

    const imageProps = { width, height, src: snapshot, style: snapshotStyle };

    return <img {...imageProps} />;
  }
}

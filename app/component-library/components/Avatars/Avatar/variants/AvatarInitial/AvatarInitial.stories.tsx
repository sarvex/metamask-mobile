// Third party dependencies.
import React from 'react';
import { select, text } from '@storybook/addon-knobs';

// External dependencies.
import { storybookPropsGroupID } from '../../../../../constants/storybook.constants';
import { AvatarSize, AvatarVariants } from '../../Avatar.types';

// Internal dependencies.
import AvatarInitial from './AvatarInitial';
import { AvatarInitialProps } from './AvatarInitial.types';
import { TEST_AVATAR_INITIAL_SAMPLE_TEXT } from './AvatarInitial.constants';

export const getAvatarInitialStoryProps = (): AvatarInitialProps => {
  const sizeSelector = select(
    'size',
    AvatarSize,
    AvatarSize.Md,
    storybookPropsGroupID,
  );
  const initialText = text(
    'initial',
    TEST_AVATAR_INITIAL_SAMPLE_TEXT,
    storybookPropsGroupID,
  );

  return {
    variant: AvatarVariants.Initial,
    size: sizeSelector,
    initial: initialText,
  };
};
const AvatarInitialStory = () => (
  <AvatarInitial {...getAvatarInitialStoryProps()} />
);

export default AvatarInitialStory;

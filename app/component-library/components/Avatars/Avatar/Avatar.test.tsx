// Third party dependencies.
import React from 'react';
import { shallow } from 'enzyme';

// External dependencies.
import { IconName } from '../../Icon';
import { TEST_AVATAR_IMAGE_REMOTE_IMAGE_SOURCE } from './variants/AvatarImage/AvatarImage.constants';
import { TEST_AVATAR_INITIAL_SAMPLE_TEXT } from './variants/AvatarInitial/AvatarInitial.constants';
import { TEST_AVATAR_JAZZICON_ADDRESS } from './variants/AvatarJazzIcon/AvatarJazzIcon.constants';

// Internal dependencies.
import Avatar from './Avatar';
import { AvatarSize, AvatarVariants } from './Avatar.types';
import {
  AVATAR_AVATAR_ICON_TEST_ID,
  AVATAR_AVATAR_IMAGE_TEST_ID,
  AVATAR_AVATAR_INITIAL_TEST_ID,
  AVATAR_AVATAR_JAZZICON_TEST_ID,
} from './Avatar.constants';

describe('Avatar - Snapshot', () => {
  it('should render AvatarIcon correctly', () => {
    const wrapper = shallow(
      <Avatar
        variant={AvatarVariants.Icon}
        size={AvatarSize.Md}
        name={IconName.AddOutline}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render AvatarImage correctly', () => {
    const wrapper = shallow(
      <Avatar
        variant={AvatarVariants.Image}
        size={AvatarSize.Md}
        imageSource={TEST_AVATAR_IMAGE_REMOTE_IMAGE_SOURCE}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render AvatarInitial correctly', () => {
    const wrapper = shallow(
      <Avatar
        variant={AvatarVariants.Initial}
        size={AvatarSize.Md}
        initial={TEST_AVATAR_INITIAL_SAMPLE_TEXT}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render AvatarJazzIcon correctly', () => {
    const wrapper = shallow(
      <Avatar
        variant={AvatarVariants.JazzIcon}
        size={AvatarSize.Md}
        address={TEST_AVATAR_JAZZICON_ADDRESS}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Avatar', () => {
  it('should render AvatarIcon component', () => {
    const wrapper = shallow(
      <Avatar
        variant={AvatarVariants.Icon}
        size={AvatarSize.Md}
        name={IconName.AddOutline}
      />,
    );
    const AvatarIconComponent = wrapper.findWhere(
      (node) => node.prop('testID') === AVATAR_AVATAR_ICON_TEST_ID,
    );
    expect(AvatarIconComponent.exists()).toBe(true);
  });
  it('should render AvatarImage component', () => {
    const wrapper = shallow(
      <Avatar
        variant={AvatarVariants.Image}
        size={AvatarSize.Md}
        imageSource={TEST_AVATAR_IMAGE_REMOTE_IMAGE_SOURCE}
      />,
    );
    const AvatarImageComponent = wrapper.findWhere(
      (node) => node.prop('testID') === AVATAR_AVATAR_IMAGE_TEST_ID,
    );
    expect(AvatarImageComponent.exists()).toBe(true);
  });
  it('should render AvatarInitial component', () => {
    const wrapper = shallow(
      <Avatar
        variant={AvatarVariants.Initial}
        size={AvatarSize.Md}
        initial={TEST_AVATAR_INITIAL_SAMPLE_TEXT}
      />,
    );
    const AvatarInitialComponent = wrapper.findWhere(
      (node) => node.prop('testID') === AVATAR_AVATAR_INITIAL_TEST_ID,
    );
    expect(AvatarInitialComponent.exists()).toBe(true);
  });
  it('should render AvatarJazzIcon component', () => {
    const wrapper = shallow(
      <Avatar
        variant={AvatarVariants.JazzIcon}
        size={AvatarSize.Md}
        address={TEST_AVATAR_JAZZICON_ADDRESS}
      />,
    );
    const AvatarJazzIconComponent = wrapper.findWhere(
      (node) => node.prop('testID') === AVATAR_AVATAR_JAZZICON_TEST_ID,
    );
    expect(AvatarJazzIconComponent.exists()).toBe(true);
  });
});

import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { useGestures } from '../hooks/useGestures';
import { useImageLayout } from '../hooks/useImageLayout';
import { useImageZoomHandle } from '../hooks/useImageZoomHandle';

import type { ImageZoomProps, ImageZoomRef } from '../types';

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

const AnimatedImage = Animated.createAnimatedComponent(Image);
const ImageZoom: ForwardRefRenderFunction<ImageZoomRef, ImageZoomProps> = (
  {
    uri = '',
    minScale,
    maxScale,
    doubleTapScale,
    minPanPointers,
    maxPanPointers,
    isPanEnabled,
    isPinchEnabled,
    isSingleTapEnabled,
    isDoubleTapEnabled,
    onInteractionStart,
    onInteractionEnd,
    onPinchStart,
    onPinchEnd,
    onPanStart,
    onPanEnd,
    onSingleTap,
    onDoubleTap,
    onResetAnimationEnd,
    onLayout,
    style = {},
    ...props
  },
  ref
) => {
  const { width, height, center, onImageLayout } = useImageLayout({ onLayout });
  const { animatedStyle, gestures, reset } = useGestures({
    width,
    height,
    center,
    minScale,
    maxScale,
    doubleTapScale,
    minPanPointers,
    maxPanPointers,
    isPanEnabled,
    isPinchEnabled,
    isSingleTapEnabled,
    isDoubleTapEnabled,
    onInteractionStart,
    onInteractionEnd,
    onPinchStart,
    onPinchEnd,
    onPanStart,
    onPanEnd,
    onSingleTap,
    onDoubleTap,
    onResetAnimationEnd,
  });
  useImageZoomHandle(ref, reset);

  return (
    <GestureDetector gesture={gestures}>
      <AnimatedImage
        style={[styles.image, style, animatedStyle]}
        source={{ uri }}
        contentFit="contain"
        onLayout={onImageLayout}
        {...props}
      />
    </GestureDetector>
  );
};

export default forwardRef(ImageZoom);

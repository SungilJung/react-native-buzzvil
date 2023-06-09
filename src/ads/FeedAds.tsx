import React, { useEffect, useRef } from 'react';
import {
  PixelRatio,
  UIManager,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native';

const createFragment = (viewId: number | null) => {
  console.log('[FeedViewManager] call createFragment:', viewId);
  UIManager.dispatchViewManagerCommand(viewId, 'create', [viewId]);
};

export const FeedAds: React.FC<{
  unitId: string;
  title?: string;
  rewardText?: string;
  width?: number;
  height?: number;
}> = ({ unitId, width = 0, height = 0, title = '', rewardText = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    console.log('[FeedViewManager] viewId:', viewId);
    createFragment(viewId);

    //feed 처음에 버튼이 동작하지 않아서 500ms 후에 한번더 생성
    const timer = setTimeout(() => {
      createFragment(viewId);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <FeedViewManager
      title={title}
      rewardText={rewardText}
      unitId={unitId}
      style={{
        width: PixelRatio.getPixelSizeForLayoutSize(width),
        height: PixelRatio.getPixelSizeForLayoutSize(height),
      }}
      ref={ref}
    />
  );
};

interface FeedViewManagerProps {
  title: string;
  rewardText: string;
  unitId: string;
  style: {
    width: number;
    height: number;
  };
}

const FeedViewManager = requireNativeComponent<FeedViewManagerProps>(
  'BuzzvilFeedViewManager'
);

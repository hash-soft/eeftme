import React from 'react';

// グローバルデータをまとめたもの
const Dataset = React.createContext([]);
// 個別イベントの参照
const MapEventsRef = React.createContext([]);
// 共通イベントの参照
const CommonEventsRef = React.createContext([]);

export { Dataset, MapEventsRef, CommonEventsRef };
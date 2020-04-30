import React from 'react';

// 少なすぎるのでファイル名を変更してグローバルデータをまとめたものにする

const Flags = React.createContext([]);
const Variables = React.createContext([]);

export {Flags, Variables};
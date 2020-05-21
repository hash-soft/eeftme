import React from 'react';

// グローバルデータをまとめたもの

const Flags = React.createContext([]);
const Variables = React.createContext([]);
const Slots = React.createContext([]);

export { Flags, Variables, Slots };
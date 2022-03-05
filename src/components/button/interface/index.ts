import React from 'react';

export default interface IButton {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

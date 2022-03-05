import React from 'react';

export interface IModal {
  active: boolean;
  id: string;
  children: React.ReactNode;
}

export interface IModalContent {
  onClose?: () => void;
  children: React.ReactNode;
}

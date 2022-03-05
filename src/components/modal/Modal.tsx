import { useEffect, useRef, useState } from 'react';
import { IModal, IModalContent } from './interface';
import './modal.scss';

const Modal = ({ active, id, children }: IModal) => {
  const [activeState, setActiveState] = useState(false);

  useEffect(() => {
    setActiveState(active);
  }, [active, activeState, setActiveState]);

  return (
    <div id={id} className={`modal ${active ? 'active' : ''}`}>
      {children}
    </div>
  );
};

export const ModalContent = ({ onClose, children }: IModalContent) => {
  const contentRef = useRef<HTMLHeadingElement>(null);

  const closeModal = () => {
    contentRef?.current?.parentElement?.classList.remove('active');

    onClose?.();
  };

  return (
    <div ref={contentRef} className="modal__content">
      {children}

      <div className="modal__content__close" onClick={closeModal}>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};

export default Modal;

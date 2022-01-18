import { HTMLProps } from 'react';

type ModalProps = HTMLProps<HTMLDivElement> & {
  forWhat: string;
};

const Modal: React.FC<ModalProps> = ({ children, forWhat, ...props }) => (
  <div className="modal" {...props}>
    <div className="modal-box">
      <div>{children}</div>
    </div>
  </div>
);

export default Modal;

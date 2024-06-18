import React from 'react';
import Button from '../Button/Button';
import styles from './styles.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
}

function Modal({ isOpen, onClose, onConfirm, title, message }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.actions}>
          <Button className="modalButton" type="button" onClick={onClose}>
            Cancel
          </Button>
          {onConfirm && (
            <Button className="modalButton" type="button" onClick={onConfirm}>
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;

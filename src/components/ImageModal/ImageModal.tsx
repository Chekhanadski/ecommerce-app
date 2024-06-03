import React from 'react';
import styles from './styles.module.css';

interface ImageModalProps {
  show: boolean;
  imageUrl: string;
  onClose: () => void;
}

function ImageModal({ show, imageUrl, onClose }: ImageModalProps) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
        <img src={imageUrl} alt="Same but bigger" className={styles.modalImage} />
        <button className={styles.closeButton} onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default ImageModal;

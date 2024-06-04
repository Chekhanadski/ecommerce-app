import React from 'react';
import styles from './styles.module.css';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Same but bigger" className={styles.modalImage} />
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}

export default ImageModal;

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalOverlay, ModalImage } from 'components/Modal/Modal.styles';

export const Modal = ({ onClose, link, alt }) => {
  useEffect(() => {
    const onCloseModal = ({ key, target, currentTarget }) => {
      if (key === 'Escape' || target === currentTarget) {
        onClose();
      }
    };
    document.addEventListener('keydown', onCloseModal);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onCloseModal);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalImage>
        <img src={link} alt={alt} />
      </ModalImage>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

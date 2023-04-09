import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import {
  GalleryItem,
  GalleryImg,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  item: { webformatURL, largeImageURL, tags },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <GalleryItem onClick={openModal}>
        <GalleryImg src={webformatURL} alt={tags} loading="lazy" />
      </GalleryItem>
      {isModalOpen && (
        <Modal
          link={largeImageURL}
          alt={tags || 'big image'}
          onClose={closeModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};

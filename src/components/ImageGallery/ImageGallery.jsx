import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledGallery } from 'components/ImageGallery/ImageGallery.styled';

export const ImageGallery = ({ galleryItems }) => {
  return (
    <StyledGallery>
      {!!galleryItems.length &&
        galleryItems.map(item => {
          return <ImageGalleryItem item={item} key={item.id} />;
        })}
    </StyledGallery>
  );
};

ImageGallery.propTypes = {
  galleryItems: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ).isRequired,
};

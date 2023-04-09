import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalOverlay, ModalImage } from 'components/Modal/Modal.styles';

export class Modal extends Component {
  onCloseModal = e => {
    if (e.key === 'Escape' || e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onCloseModal);
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onCloseModal);
    document.body.style.overflow = 'auto';
  }
  render() {
    const { link, alt } = this.props;
    return (
      <ModalOverlay onClick={this.onCloseModal}>
        <ModalImage>
          <img src={link} alt={alt} />
        </ModalImage>
      </ModalOverlay>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

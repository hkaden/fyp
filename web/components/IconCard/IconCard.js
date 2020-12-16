import React from 'react';
import PropTypes from 'prop-types';
import IconCardWrapper, { IconWrapper, TitleArea } from './IconCard.style';

const IconCard = ({ icon, title, align, className }) => {

  const addAllClasses = ['icon_card'];

  if (className) {
    addAllClasses.push(className);
  }

  return (
    <IconCardWrapper className={addAllClasses.join(' ')} align={align}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {title && <TitleArea>{title}</TitleArea>}
    </IconCardWrapper>
  );
};

IconCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.element,
};

export default IconCard;

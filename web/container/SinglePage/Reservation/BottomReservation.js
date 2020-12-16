import React, { useState, Fragment } from 'react';
import { IoIosClose } from 'react-icons/io';
import Rating from 'components/UI/Rating/Rating';
import { Button, Modal, notification, Divider, Space  } from 'antd';
import StickyBooking from 'components/StickyBooking/StickyBooking';
import LogoImage from 'assets/images/logo-alt.svg';
import Reservation from './Reservation';
import Router from 'next/router';
const Context = React.createContext({ name: 'Default' });
const BottomReservation = ({ title, price, rating, ratingCount }) => {
  const [api, contextHolder] = notification.useNotification();
  const [state, setState] = useState(false);
  const toggleModal = () => {
    setState(!state);
  };
  const handleCancel = () => {
    setState(!state);
  };

  const handleBook = () => {
    notification.success({
      message: '預訂成功',
      description:
        '你的預訂已經成功了!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

  return (
    <Fragment>
      <StickyBooking
        logo={LogoImage}
        title={title}
        price={price}
        rating={
          <Rating rating={rating} ratingCount={ratingCount} type="bulk" />
        }
        action={
          <Button type="primary" onClick={handleBook }>
            預訂行程
          </Button>
        }
      />

      <Modal
        visible={state}
        onCancel={handleCancel}
        footer={null}
        maskStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
        wrapClassName="reservation_modal"
        closable={false}
      >
        <Reservation />
        <Button onClick={handleCancel} className="close">
          <IoIosClose />
        </Button>
      </Modal>
    </Fragment>
  );
};

export default BottomReservation;

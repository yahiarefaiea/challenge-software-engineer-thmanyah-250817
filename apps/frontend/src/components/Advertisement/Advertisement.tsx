'use client';

import React, { useState } from 'react';
import classNames from 'classnames';
import type { AdvertisementProps } from './types';
import './Advertisement.scss';

export const Advertisement: React.FC<AdvertisementProps> = ({
  className,
  ...props
}) => {
  const classes = classNames('advertisement', className);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div
      className={classes}
      onClick={handleClick}
      {...props}
    >
      {!isClicked ? (
        <h3>
          Advertisement
          <br />
          Click for a surprise ^^
        </h3>
      ) : (
        <h3>
          I would’ve loved to spend more time on this surprise... but time’s up! In the meantime, enjoy this adorable cat video instead ^^ 👉🏻 ⚡️
          <a
            target="_blank"
            href="https://youtube.com/shorts/eOaUKalYlNU?si=CLR8yfecDn6u2nXP"
            className="underline"
          >
            Watch cats running
          </a>
          ⚡️
        </h3>
      )}
    </div>
  );
};

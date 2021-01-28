import React, { useState } from "react";
import Swiper, { ReactIdSwiperProps } from "react-id-swiper";
import NoImage from "../../assets/Images/noImage.png";
// import "swiper/css/swiper.css";
import styled from "styled-components";
import { ImageTypes } from "../UIkit/types";

type Props = {
  images?: ImageTypes;
};

export const ImageSwiper: React.FC<Props> = (props) => {
  const [params] = useState<
    ReactIdSwiperProps & React.RefAttributes<HTMLDivElement>
  >({
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });

  const images = props.images;

  return (
    <Swiper {...params}>
      {images!.length >= 1 ? (
        images!.map((image, index) => (
          <StyledContainer key={index}>
            <StyledWrap>
              <img src={image.path} alt="商品画像" />
            </StyledWrap>
          </StyledContainer>
        ))
      ) : (
        <StyledContainer>
          <StyledWrap>
            <img src={NoImage} alt="noimage" />
          </StyledWrap>
        </StyledContainer>
      )}
    </Swiper>
  );
};

const StyledContainer = styled.div`
  position: relative;
  ::before {
    content: "";
    display: block;
    padding-top: calc(9 / 16 * 100%);
  }
`;

const StyledWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  img {
    width: 100%;
    height: auto;
  }
`;

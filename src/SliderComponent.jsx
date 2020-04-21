import React from "react";
import Slider from "@bit/akiran.react-slick.slider";
import { shallowEqual, useSelector } from "react-redux";
import { Typography } from "antd";
const { Title } = Typography;

export default function SliderComponent() {
  const collectionsState = useSelector(
    state => state.supplierReducer.collections,
    shallowEqual
  );

  const cssstyle = `
            .container {
              margin: 0 auto;
              padding: 0px 40px 40px 40px;
            }
            h3 {
                background: #5f9ea0;
                color: #fff;
                font-size: 36px;
                line-height: 100px;
                margin: 10px;
                padding: 2%;
                position: relative;
                text-align: center;
            }
            .slick-next:before, .slick-prev:before {
                color: #000;
            }
        `;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <div className="container">
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <style>{cssstyle}</style>

      {collectionsState.length !== 0 ? (
        <>
          <Title level={4}>My Collections</Title>
          <Slider {...settings}>
            {collectionsState.map((item, index) => {
              return (
                <>
                  <div>
                    <h3>{item.index}</h3>
                  </div>
                </>
              );
            })}
          </Slider>
        </>
      ) : null}
    </div>
  );
}

import Card from "react-bootstrap/Card";

import { useState } from "react";

export default function ProductCard({ name, image, price, count, clickEvent }) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  let background = "";
  let cardClass = "position-relative rounded-3 ";
  if (isHover) {
    background = "bg-secondary-subtle";
    cardClass += " border-warning";
  } else {
    cardClass += " border-warning-subtle";
  }

  return (
    <Card
      style={{ width: "12rem" }}
      className={cardClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={clickEvent}
    >
      <Card.Img
        className="border-bottom w-100 object-fit-cover p-4"
        style={{ height: "288px" }}
        variant="top"
        src={image}
      />
      <Card.Body className={background}>
        <Card.Title>{name}</Card.Title>
        <Card.Text className="fs-5 fw-medium">{price}₺</Card.Text>
      </Card.Body>

      <div className="position-absolute top-0 end-0 px-3 py-2 fs-5 fw-bold">
        {count}
      </div>
    </Card>
  );
}

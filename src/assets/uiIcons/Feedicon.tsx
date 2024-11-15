const FeedIcon = (props: any) => {
  const {
    size,
    isSelected,
    isFilled,
    colorSelected,
    colorUnselected,
    colorStroke,
  } = props;

  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      viewBox="0 0 416.7 396.4"
    >
      <g>
        <path
          id="Trazado_3046"
          d="M8.2,321.9V146.4c2.4-17.8,11.8-33.9,26.2-45.2C58.4,82.8,188.9,11,188.9,11
            c13.4-5.2,28.4-5.2,41.8,0c16.3,9.6,155.9,106.4,155.9,106.4C401,130,409,148.2,408.5,167c-0.7,32.1,0,116.1,0,154.9
            c0.3,34.6-26.6,63.8-62.3,67.5h-265C15,389.3,8.2,321.9,8.2,321.9z"
          fill={
            isSelected
              ? colorSelected
              : isFilled
              ? `${colorUnselected}80`
              : "none"
          }
          stroke={isSelected || isFilled ? "none" : colorUnselected}
          strokeWidth="30"
        />

        <path
          id="Trazado_3071"
          d="M208.3,348.1v-70.6"
          stroke={isSelected ? colorStroke : colorUnselected}
          strokeWidth="20"
        />
      </g>
    </svg>
  );
};

export default FeedIcon;

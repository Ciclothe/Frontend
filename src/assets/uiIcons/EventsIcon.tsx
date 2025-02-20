const EventsIcon = (props: any) => {
  const { size, isSelected, isFilled, colorSelected, colorUnselected } = props;

  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      viewBox="0 0 416.7 396.4"
    >
      <path
        id="handshake-outline"
        d="M390.3,196.5c1.2,11.2-6.9,21.3-18.1,22.5c-1.5,0.2-3,0.2-4.4,0h-22.5v22.5
          c1.2,11.2-6.9,21.3-18.1,22.5c-1.5,0.2-3,0.2-4.4,0h-22.5v22.4c1.3,11.2-6.8,21.3-18,22.6c-1.5,0.2-3,0.2-4.5,0h-99.4l-73.9,73.9
          c-7,6.5-11,2.7-13.5,0.2l-67.4-67.2c-6.5-7-2.7-11-0.2-13.5l29.1-29.3v-90.1l45.1-45.1V174c-1.1,36.2,27.4,66.5,63.7,67.6
          c1.3,0,2.6,0,3.9,0c36.2,1.1,66.5-27.4,67.6-63.7c0-1.3,0-2.6,0-3.9h157.7L390.3,196.5 M396.8,90.5l-38.3,38.5h-171V174
          c1.2,11.2-6.9,21.3-18.1,22.5c-1.5,0.2-3,0.2-4.4,0c-11.2,1.2-21.3-6.9-22.5-18.1c-0.2-1.5-0.2-3,0-4.4v-67.6
          c-1.6-23.3,16-43.5,39.3-45.1c1.9-0.1,3.8-0.1,5.7,0h76.8L315.7,10C322.7,3.4,399.3,87.9,396.8,90.5z"
        fill={
          isSelected
            ? colorSelected
            : isFilled
            ? `${colorUnselected}80`
            : "none"
        }
        stroke={isSelected || isFilled ? "none" : colorUnselected}
        strokeWidth="20"
      />
    </svg>
  );
};

export default EventsIcon;

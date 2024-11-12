const SwipeIcon = (props: any) => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      viewBox="0 0 416.7 396.4"
    >
      <g>
        <path
          d="M336.1,48.9v298.5c0,23.5-19.1,42.6-42.6,42.6H123.2c-23.5,0-42.6-19.1-42.6-42.6V48.9c0-23.5,19.1-42.6,42.6-42.6h170.2
 C317,6.3,336.1,25.4,336.1,48.9z"
          fill={props.isSelected ? props.colorSelected : "none"}
          stroke={props.isSelected ? "none" : props.colorUnselected}
          strokeWidth="20"
        />
        <path
          d="M356.1,35.7h27.8c0,0,24.9,0.3,24.9,24.2v281.5c0,0,0.1,23.1-20.7,23.1h-32"
          fill={props.isSelected ? props.colorSelected : "none"}
          stroke={props.isSelected ? "none" : props.colorUnselected}
          strokeWidth="20"
        />
        <path
          d="M60.6,33.7H32.8c0,0-24.9,0.3-24.9,24.2v281.5c0,0-0.1,23.1,20.7,23.1h32"
          fill={props.isSelected ? props.colorSelected : "none"}
          stroke={props.isSelected ? "none" : props.colorUnselected}
          strokeWidth="20"
        />
      </g>
    </svg>
  );
};

export default SwipeIcon;

const ChatsIcon = (props: any) => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      viewBox="0 0 416.7 396.4"
    >
      <g id="Grupo_3152" transform="translate(-127.833 -364.556)">
        <path
          id="chat"
          d="M336.2,392.1c104.3,0,189.6,67.9,189.6,151.7s-85.3,151.7-189.6,151.7c-22.6,0-45.2-3.2-66.9-9.5
     c-34.7,28.7-77.7,45.3-122.7,47.4c44.2-44.2,51.2-73.9,52.1-85.3c-32-25.2-51.2-63.5-52.1-104.3C146.6,460,231.9,392.1,336.2,392.1
     z"
          fill={props.isSelected ? props.colorSelected : "none"}
          stroke={props.isSelected ? "none" : props.colorUnselected}
          strokeWidth="20"
        />
        <circle
          id="Elipse_199"
          cx="258.1"
          cy="545"
          r="23.1"
          fill={props.isSelected ? props.colorStroke : props.colorUnselected}
        />
        <circle
          id="Elipse_200"
          cx="335"
          cy="545"
          r="23.1"
          fill={props.isSelected ? props.colorStroke : props.colorUnselected}
        />
        <circle
          id="Elipse_201"
          cx="411.9"
          cy="545"
          r="23.1"
          fill={props.isSelected ? props.colorStroke : props.colorUnselected}
        />
      </g>
    </svg>
  );
};

export default ChatsIcon;

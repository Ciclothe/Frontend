const SaveIcon = (props: any) => {
  return (
    <div>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        viewBox="0 0 416.7 396.4"
      >
        <path
          id="Trazado_3074"
          d="M76.7,374.2v-352H340v352L209.3,260.3L76.7,374.2z"
          fill={props.isSelected ? props.colorFill : "none"}
          stroke={props.isSelected ? "none" : props.colorStroke}
          strokeWidth="40"
        />
      </svg>
    </div>
  );
};

export default SaveIcon;

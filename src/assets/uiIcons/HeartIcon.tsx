const HeartIcon = (props: any) => {
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
          id="heart"
          d="M208.3,374.2l-27.8-25.3c-98.8-89.6-164-148.9-164-221.2C15.9,70,62.1,22.8,119.7,22.2
	c0.8,0,1.5,0,2.3,0c33.2,0.3,64.6,14.8,86.3,39.9C230,37,261.5,22.4,294.7,22.2c57.6-0.6,104.9,45.6,105.5,103.2c0,0.8,0,1.5,0,2.3
	c0,72.3-65.2,131.6-164,221.2L208.3,374.2z"
          fill={props.isSelected ? props.colorFill : "none"}
          stroke={props.isSelected ? "none" : props.colorStroke}
          strokeWidth="40"
        />
      </svg>
    </div>
  );
};

export default HeartIcon;

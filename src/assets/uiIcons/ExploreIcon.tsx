const ExploreIcon = (props: any) => {
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
        id="compass"
        d="M249.7,239.5L95.2,311.2l71.8-154.5L321.5,85L249.7,239.5z M208.4,9.6
          C104.3,9.6,19.8,94,19.8,198.1s84.4,188.6,188.5,188.6s188.6-84.4,188.6-188.5c0,0,0,0,0-0.1C396.9,94.1,312.5,9.6,208.4,9.6
          M208.4,177.4c-11.5,0-20.7,9.3-20.7,20.7c0,11.5,9.3,20.7,20.7,20.7c11.4,0,20.7-9.3,20.7-20.7
          C229.2,186.7,219.9,177.4,208.4,177.4C208.4,177.4,208.4,177.4,208.4,177.4z"
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

export default ExploreIcon;

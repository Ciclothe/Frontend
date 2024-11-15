const CommunitiesIcon = (props: any) => {
  const { size, colorSelected, isActive } = props;

  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      viewBox="0 0 416.7 396.4"
    >
      <path id="Trazado_3068" d="M244.7,244.7l72-155" />
      <path
        id="account-multiple"
        d="M284.7,303.2v38.2H17.4v-38.2c0,0,0-76.4,133.7-76.4S284.7,303.2,284.7,303.2
	 M217.9,121.8c0-36.9-29.9-66.8-66.8-66.8s-66.8,29.9-66.8,66.8s29.9,66.8,66.8,66.8S217.9,158.7,217.9,121.8L217.9,121.8
	 M283.6,226.8c23.8,18.4,38.2,46.4,39.3,76.4v38.2h76.4v-38.2C399.3,303.2,399.3,233.9,283.6,226.8 M265.6,54.9
	c-13.1-0.1-26,3.9-36.9,11.3c11.8,17.1,18.1,37.5,17.8,58.3c-0.2,19.1-6.5,37.6-17.8,52.9c10.9,7.4,23.7,11.3,36.9,11.3
	c36.9,0,66.8-29.9,66.8-66.8S302.6,54.9,265.6,54.9z"
        fill={isActive ? `${colorSelected}` : `${colorSelected}80`}
        strokeWidth="20"
      />
    </svg>
  );
};

export default CommunitiesIcon;

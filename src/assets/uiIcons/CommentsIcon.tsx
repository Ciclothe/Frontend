const CommentsIcon = (props: any) => {
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
          id="comment-processing"
          d="M150.5,374.2c-10.6,0-19.1-7.9-19.1-17.6v-52.8H54.8c-21.1,0-38.3-15.8-38.3-35.2V57.4
	c0-19.4,17.1-35.2,38.3-35.2l0,0H361c21.1,0,38.3,15.8,38.3,35.2v211.2c0,19.4-17.1,35.2-38.3,35.2H244.3l-70.8,65.3
	c-3.6,3.2-8.4,5.1-13.4,5.1H150.5"
          fill={"none"}
          stroke={props.colorStroke}
          strokeWidth="40"
        />
      </svg>
    </div>
  );
};

export default CommentsIcon;

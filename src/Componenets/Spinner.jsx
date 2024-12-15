import { GridLoader } from "react-spinners";

const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// This is grid loader from react spinners
const GridApp = () => {
  return (
    <div className=" h-screen flex justify-center items-center">
      <GridLoader color="#36D7B7" loading={true} css={override} size={20} />
    </div>
  );
};

export default GridApp;

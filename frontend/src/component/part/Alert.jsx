/* eslint-disable react/prop-types */
import { BiCheck } from "react-icons/bi";
import { BsExclamationCircleFill } from "react-icons/bs";

function Alert({ data, type }) {
  return (
    <div>
      {type === "error" ? (
        <div className="alert show" style={{ backgroundColor: "#feb3db" }}>
          <div>
            <BsExclamationCircleFill size={40} />
          </div>
          <span>{data}</span>
        </div>
      ) : (
        <div className="alert">
          <div>
            <BiCheck size={70} />
          </div>
          <span>{data}</span>
        </div>
      )}
    </div>
  );
}

export default Alert;

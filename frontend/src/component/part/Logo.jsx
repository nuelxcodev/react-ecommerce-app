import { AiFillPieChart } from "react-icons/ai";

function Logo() {
  return (
    <div id="icon">
      <h1
        style={{
          fontFamily: "monospace",
          fontWeight: "bold",
          position: "relative",
          backgroundColor: "black",
          color: "white",
          borderRadius: "5px",
          paddingInline: "5px",
        }}
      >
        <AiFillPieChart
          size={55}
          color="black"
          style={{
            position: "absolute",
            zIndex: "-1",
            left: "-20",
            top: "-20",
          }}
        />
        NUELMAT
      </h1>
    </div>
  );
}

export default Logo;

function Imagediv() {
  return (
    <div>
      <div
        className="image-input"
        id="item-image"
        onClick={() => {
          document.getElementById("inputFile").click();
        }}
      >
        <input
          type="file"
          id="inputFile"
          onChange={(e) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              
              const bg = document.getElementById("item-image");
              bg.style.backgroundImage = "url(" + reader.result;
              bg.style.backgroundSize = "cover";
            });
            reader.readAsDataURL(e.target.files[0]);
          }}
        />
        <input type="button" value="addimages" style={{ display: "block" }} />
      </div>
    </div>
  );
}

export default Imagediv;

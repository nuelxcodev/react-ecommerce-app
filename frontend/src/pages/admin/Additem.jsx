/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import Nav from "../../component/Nav";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../../../utils/Store";
import Imagediv from "../../component/part/Imagediv";

function Additem() {
  const { state, dispatch } = useContext(Store);
  const { user } = state;
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();

  return (
    <div>
      <Nav />
      <div className="containter">
        <form
          className="admi-post-items"
          onSubmit={handleSubmit((data) => {
            axios.post("http://localhost:8080/api/item", {
              username: user.username,
              data,
            });
          })}
        >
          <div className="image-cont">
            <div className="image-wrapper">
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
                      register("image", { value: reader.result });
                      const bg = document.getElementById("item-image");
                      bg.style.backgroundImage = "url(" + reader.result;
                      bg.style.backgroundSize = "cover";
                    });
                    reader.readAsDataURL(e.target.files[0]);
                  }}
                />
                <input
                  type="button"
                  value="addimages"
                  style={{ display: "block" }}
                />
              </div>
            </div>
            <input
              type="button"
              value="add more images"
              style={{ backgroundColor: "yellow", padding: "10px" }}
              onClick={() => {
                const box = document.getElementById("item-image");
                document.getElementById("more-images").append(<div>ghjkl</div>);
              }}
            />
            <div id="more-images"></div>
          </div>

          <section className="input-cont">
            <h2>upload items:</h2>
            <div className="text">
              <input type="text" placeholder="name" {...register("name")} />
            </div>
            <div className="text">
              <input type="text" placeholder="id/slug" {...register("slug")} />
            </div>
            <div className="text">
              <input
                type="text"
                placeholder="category"
                {...register("category")}
              />
              <select></select>
            </div>
            <div className="text">
              <input placeholder="brand" {...register("brand")} />
              <select></select>
            </div>

            <div className="price-container">
              <div className="input">
                <select></select>
                <input
                  placeholder="price"
                  id="price"
                  {...register("price", { pattern: { value: /^[0-9]/ } })}
                />
              </div>
              <div className="input">
                <input
                  placeholder="instock"
                  {...register("countInStock", {
                    pattern: { value: /^[0-9]/ },
                  })}
                />
              </div>
            </div>
            <div>
              <div>
                <input type="submit" />
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

export default Additem;

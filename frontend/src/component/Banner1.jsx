import laptop from "../../public/images/brand.png";

function Banner1() {
  return (
    <div>
      <section className="banner-cont">
        <div>
          <img src={laptop} alt="bannerImage" />
        </div>
      </section>
    </div>
  );
}

export default Banner1;

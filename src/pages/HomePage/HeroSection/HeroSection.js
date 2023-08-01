import '../HeroSection/HeroSection.css';
import bannerMen from '../../../assets/images/men-hero-banner.jpeg';
import bannerWomen from '../../../assets/images/women-fasion.jpg';
import bannerKids from '../../../assets/images/kids-fasion.webp';

const HeroSection = () => {
  return (
    // carousel using bootstrap
    <div
      id="carouselExampleIndicators"
      className="carousel slide mt-5"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner container px-0">
        {/* first slide of carousel */}
        <div className="carousel-item active row">
          <img
            data-testid="firstSlide"
            className="d-block col-md-5"
            src={bannerMen}
            height="300px"
            width="auto"
            alt="First slide"
          />
          <div className="col-md-7">
            <h1>Same day delivery</h1>
            <p data-testid="menHeadline">Upto 60% Off on Mens Products</p>
            <p data-testid="menContent">
              The one-stop destination for all your shopping needs. Spark brings
              you the joys of shopping online in your own language, with
              discounts on quality-assured products, rewards for playing games,
              and extra SuperCoins with every purchase. With a huge selection of
              original products fashion and more - you get timely alerts on
              great deals and updates on everything you need.
            </p>
          </div>
        </div>
        {/* second slide of carousel */}
        <div className="carousel-item">
          <img
            data-testid="secondSlide"
            className="d-block col-md-5"
            src={bannerWomen}
            height="300px"
            width="auto"
            alt="Second slide"
          />
          <div className="col-md-7 xs-12 mx-4">
            <h1>Same day delivery</h1>
            <p data-testid="womenHeadline">Upto 60% Off on Womens Products</p>
            <p data-testid="womenContent">
              The one-stop destination for all your shopping needs. Spark brings
              you the joys of shopping online in your own language, with
              discounts on quality-assured products, rewards for playing games,
              and extra SuperCoins with every purchase. With a huge selection of
              original products fashion and more - you get timely alerts on
              great deals and updates on everything you need.
            </p>
          </div>
        </div>
        {/* third slide of carousel */}
        <div className="carousel-item">
          <img
            data-testid="thirdSlide"
            className="d-block col-md-5 xs-12 mx-4"
            src={bannerKids}
            height="300px"
            width="auto"
            alt="Third slide"
          />
          <div className="col-md-7 xs-12">
            <h1>Same day delivery</h1>
            <p data-testid="kidsHeadline">Upto 60% Off on Kids Products</p>
            <p data-testid="kidsContent">
              The one-stop destination for all your shopping needs. Spark brings
              you the joys of shopping online in your own language, with
              discounts on quality-assured products, rewards for playing games,
              and extra SuperCoins with every purchase. With a huge selection of
              original products fashion and more - you get timely alerts on
              great deals and updates on everything you need.
            </p>
          </div>
        </div>
      </div>
      {/* Previous button  */}
      <div className='d-flex w-100 justify-content-between mt-3 px-3'>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only"></span>
        </a>
        {/* Next button  */}
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only"></span>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;

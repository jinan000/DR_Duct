import './Footer.css';
import logoImg from '../../assets/images/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        
        <div className="footer__main">
          <div className="footer__brand">
            <img src={logoImg} alt="Dr. Duct Logo" className="footer__logo" />
            <p className="footer__desc">
              Premium kitchen extract and duct cleaning specialists operating across the UK. Ensuring compliance, safety, and hygiene.
            </p>
          </div>

          <div className="footer__links-grid">
            <div className="footer__col">
              <h4 className="footer__col-title">Navigation</h4>
              <ul className="footer__list">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#industries">Industries</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Services</h4>
              <ul className="footer__list">
                <li><a href="#services">Kitchen Deep Cleaning</a></li>
                <li><a href="#services">Duct Cleaning</a></li>
                <li><a href="#services">Fire Damper Service</a></li>
                <li><a href="#services">Compliance Services</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Contact</h4>
              <ul className="footer__list">
                <li><a href="tel:+442045264142">+44 20 4526 4142</a></li>
                <li><a href="mailto:info@drductuk.co.uk">info@drductuk.co.uk</a></li>
                <li><span>Unit 4, Greenway Business Park</span></li>
                <li><span>Bedford, MK42 6DP, UK</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            &copy; {currentYear} Dr. Duct UK Ltd. All rights reserved.
          </div>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

import Banner from '../assets/components/landingpage/banner';
import Discover from '../assets/components/landingpage/discover';
import FAQ from '../assets/components/landingpage/faq';
import Features from '../assets/components/landingpage/features';
import Footer from '../assets/components/landingpage/footer';
import Testimonial from '../assets/components/landingpage/testimonials';
import UserJourney from '../assets/components/landingpage/userJourney';

export default function LandingPage() {
  return (
    <>
      <div className="bg-base-200">
        <Banner />
        <UserJourney />
        <Features />
        <FAQ />
        <Testimonial />
        <Footer />
      </div>
    </>
  );
}

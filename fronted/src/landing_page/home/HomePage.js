import Hero from './Hero';
import Awards from './Awards';
import StatsComponent from './StatsComponent';
import Pricing from './Pricing';
import Education from './Education';
import OpenAccount from '../../OpenAccount';

function HomePage() {
  return (
    <>
      <Hero />
      <Awards />
      <StatsComponent />
      <Pricing />
      <Education />
      <OpenAccount />
    </>
  );
}

export default HomePage;

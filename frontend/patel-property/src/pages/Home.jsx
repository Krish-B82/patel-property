import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import PropertyTypeCards from '../components/home/PropertyTypeCards';
import LatestProperties from '../components/home/LatestProperties';
import BudgetSearch from '../components/home/BudgetSearch';
import PopularAreas from '../components/home/PopularAreas';
import Insights from '../components/home/Insights';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PropertyTypeCards />
      <BudgetSearch />
      <LatestProperties />
      <PopularAreas />
      <Insights />
      <Footer />
    </div>
  );
};

export default Home;
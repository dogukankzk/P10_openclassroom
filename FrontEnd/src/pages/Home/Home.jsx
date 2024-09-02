import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/Banner/Banner'; 
import FeatureList from '../../components/Features/FeatureList';
import './Home.css';

function Home() {
  return (
    <div>
      <Header />
      <main>
        <Banner /> 
        <FeatureList /> 
      </main>
      <Footer />
    </div>
  );
}

export default Home;

import Banner from '../components/Banner'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Contact from './Contact'

const Home = () => {
  return (
    <div>
        <Header />
        <SpecialityMenu />
        <TopDoctors />
        <Banner />
        <Contact />
    </div>
  )
}

export default Home
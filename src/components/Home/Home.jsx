import Nav from './Nav'
import MainMovie from './MainMovie'
import './css/Home.css'
import Row from './Row'
import requests from '../../Requests'

function Home() {
    return (
        <div className="home">
            <Nav />            
            <MainMovie />
            <Row
                title="Netflix originals"
                fetchUrl={requests.fetchNetflix}
                isLargeRow
             />
            <Row
                title="Trending Movies"
                fetchUrl={requests.fetchTrending}
             />
            <Row
                title="Top Rated Movies"
                fetchUrl={requests.fetchTopRated}
             />
            <Row
                title="Action Movies"
                fetchUrl={requests.fetchAction}
             />
            <Row
                title="Comedy Movies"
                fetchUrl={requests.fetchComedy}
             />
            <Row
                title="Horror Movies"
                fetchUrl={requests.fetchHorror}
             />
            <Row
                title="Romance Movies"
                fetchUrl={requests.fetchRomance}
             />
            <Row
                title="Documentaries"
                fetchUrl={requests.fetchDocumentaries}
             />
        </div>
    )
}

export default Home

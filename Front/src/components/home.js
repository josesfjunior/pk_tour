import "../index.css"
function Home(){
    return (
        <div>
            <h1 className="text-center">olá eu sou a home</h1>
            <a href='/about' className="link link-primary mr-2 ml-2">About</a>
            <a href='/ranking' className="link link-primary mr-2 ml-2">Ranking</a>
            <a href="/edicoes" className="link link-primary mr-2 ml-2">Edições</a>
        </div>
    )
}
export default Home
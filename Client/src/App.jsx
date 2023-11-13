import TopBar from "./components/header/topbar.jsx";
import List from "./components/listMovie/list.jsx";
import './App.css';


function App() {

  return(
        <>
          <div className="bg">
            <section><TopBar/></section>
            <section className="list">
                <List/>
            </section>
            <section className="aboutus">

            </section>
            
          </div>
          
        </>
      
  )
}

export default App;

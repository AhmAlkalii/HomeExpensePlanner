// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

//components
import Nav from "../components/Nav";

//assests
import wave from '../assets/wave.svg';

const Main = () => { 
  return (
    <div className="layout">
      <Nav/>
      <main>
        <Outlet/>
      </main>
      <img src={wave} alt="" />
    </div>
  )
}
export default Main

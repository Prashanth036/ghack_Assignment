import { Outlet } from "react-router-dom";
import AppAppBar from "./components/Header";



export default function Layout(){

    return(<>
        <div className="flex flex-col">
        <header>
            <AppAppBar />
        </header>
        <main className="my-10">
            <Outlet />
        </main>
        <footer>

        </footer>
        </div>
        </>)
}
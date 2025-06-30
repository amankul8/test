import { Outlet } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";

export default function Layout() {

    return(
        <main>  
            <Outlet />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </main>
    )
}
import { Outlet } from "react-router";
import Header from "../layout_components/header";

import Content from "../layout_components/content";
import TopBar from "../components/top_bar";

export default function PagesLayout() {

    
    return(
        <>  
            <Header>
                <Content>
                    <TopBar/>
                </Content>
            </Header>    
            <Outlet />
        </>
    )
}
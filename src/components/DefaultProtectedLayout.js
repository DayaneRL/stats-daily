import { CContainer } from "@coreui/react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const DefaultProtectedLayout = ({children}) => {
    return(
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
            <div className="body flex-grow-1">
                <CContainer className="px-2" lg>
                    {children}
                </CContainer>
            </div>
                <AppFooter />
            </div>
        </div>
    )
}
export default DefaultProtectedLayout;
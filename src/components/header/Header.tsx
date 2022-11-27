import { MDBNavbar, MDBNavbarBrand, MDBContainer } from 'mdbreact';

const Header = () => {
    return (
        <header>
            <MDBNavbar color="black" dark expand="md">
                <MDBContainer>
                    <MDBNavbarBrand>
                        <strong>Crewmeister Frontend Challenge</strong>
                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>
        </header>
    )
};

export default Header;
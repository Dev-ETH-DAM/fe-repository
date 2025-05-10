import { useConnect } from "wagmi";
import { Button, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "./DisconnectedLanding.css";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Footer from "../Footer/Footer";
import CarouselItem from "../Carrousel/CrrouselItem";
export default function DisconnectedLanding() {
    const { connect, connectors } = useConnect();
    const items = [
                {
            name: "Random Name #2",
            description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
            image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            name: "Random Name #1",
            description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
            image: "https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            name: "Random Name #2",
            description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
            image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    return (

        <main>
            <div className="hero-section">
                <div
                    className="hero-bg"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    }}
                >
                    <span className="hero-overlay"></span>
                </div>
                <div className="hero-container">
                    <h1 className="hero-title">Your resources. Your time. Our mission</h1>
                    <p className="hero-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </p>
                    {connectors.map((connector: any) => (
                        <Button variant="contained" key={connector.uid} onClick={() => connect({ connector })} data-testid={connector.id}>
                            Connect with  {connector.name}
                        </Button>
                    ))}


                </div>
                <div className="section-divider">
                    <svg
                        className="absolute bottom-0"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    ></svg>
                </div>
            </div >
            <section className="features-section">
                <div className="features-container">
                    <div className="carousel-container">
                        <Carousel>
                            {items.map((item, i) => (
                                <CarouselItem key={i} item={item} />
                            ))}
                        </Carousel>
                    </div>
                    <div className="feature-description-box">
                        <div className="feature-header">
                            <div className="feature-icon">
                                <RocketLaunchIcon></RocketLaunchIcon>
                            </div>
                            <h3 className="feature-heading">New solution </h3>
                        </div>
                        <p className="text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                        <ul className="feature-list">
                            <li>
                                <h4 className="feature-item">Lorem ipsum dolor sit amet,</h4>
                            </li>
                            <li>
                                <h4 className="feature-item">Lorem ipsum dolor sit amet,</h4>
                            </li>
                            <li>
                                <h4 className="feature-item">
                                    Lorem ipsum dolor sit amet,
                                </h4>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="bg-light-gray">
                <div className="features-container">
                    <div className="feature-box">
                        <div className="feature-icon-circle">
                            <RocketLaunchIcon></RocketLaunchIcon>
                        </div>
                        <h6 className="feature-title">Excellent Services</h6>
                        <p className="feature-description">
                            We have a mission to provide top quality.
                        </p>
                    </div>
                    <div className="feature-box">
                        <div className="feature-icon-circle">
                            <RocketLaunchIcon></RocketLaunchIcon>
                        </div>
                        <h6 className="feature-title">Security</h6>
                        <p className="feature-description">
                            Your data is safe with us as we use only established, reliable technology.
                        </p>
                    </div>
                    <div className="feature-box">
                        <div className="feature-icon-circle">
                            <RocketLaunchIcon></RocketLaunchIcon>
                        </div>
                        <h6 className="feature-title">Easy to use</h6>
                        <p className="feature-description">
                            An intuitive interface that can be used by anyone.
                        </p>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </main>

    );
}



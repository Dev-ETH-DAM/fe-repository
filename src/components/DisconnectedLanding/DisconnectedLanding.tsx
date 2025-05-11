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
            name: "Supercharge Research in Minutes",
            description:
                "Launch thousands of trusted CPU & GPU cores on demand—no data center, no up-front cost. Our decentralized grid lets you go from idea to results faster than ever.",
            image: "https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            name: "Earn While Your Hardware Rests",
            description:
                "Have idle GPUs or spare server time? Plug into the network, run workloads inside a TEE, and collect instant micro-payments for every validated subtask you complete.",
            image:
                "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            name: "Confidential by Design",
            description:
                "Powered by Oasis Sapphire, each computation executes inside a Trusted Execution Environment, keeping data and models private—even from the node operator.",
            image:
                "https://images.unsplash.com/photo-1605902711622-cfb43c4437f4?auto=format&fit=crop&w=2070&q=80",
        },
        {
            name: "From Laptop to Lab in One Click",
            description:
                "New to high-performance computing? Skip the hardware investment. Submit a job, set a budget, and watch your experiment scale horizontally across the grid.",
            image:
                "https://images.unsplash.com/photo-1581091870627-3ff9cf632b7a?auto=format&fit=crop&w=2070&q=80",
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
                <div className="hero-container"><h1 className="hero-title-0">Introducing ChainLab Grid</h1>
                    <h1 className="hero-title">Your resources. Your privacy. Your freedom. Our mission</h1>

                    <p className="hero-description">
                        Need breakthrough results now—but don’t own a data-center?
                        Welcome to the Open Compute Grid: a decentralized, TEE-secured marketplace where you can spin up thousands of trusted cores in minutes, pay only for what you use, and keep your data private.
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
                            ChainLab Grid lets you share computational resources across the grid and earn or help while every step—validation, decomposition, execution, and payout—is cryptographically enforced by Oasis’ modern TEE and confidential-EVM stack.
                        </p>
                        <ul className="feature-list">
                            <li>
                                <h4 className="feature-item">Share computational resources across the grid, decentralized</h4>
                            </li>
                            <li>
                                <h4 className="feature-item">Earn/Help securely and validated by latest Oasis Technologies</h4>
                            </li>
                            <li>
                                <h4 className="feature-item">
                                    Anyone can contribute, we validate and aggregate, securely by TEE
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
                        <h6 className="feature-title">Top performance seamlessly</h6>
                        <p className="feature-description">
                            Scale instantly, contribute effortlessly
                        </p>
                    </div>
                    <div className="feature-box">
                        <div className="feature-icon-circle">
                            <RocketLaunchIcon></RocketLaunchIcon>
                        </div>
                        <h6 className="feature-title">Security</h6>
                        <p className="feature-description">
                            Your data is safe with us as we use only established, reliable technology like TEE
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



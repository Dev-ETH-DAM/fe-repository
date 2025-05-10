import { Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import ReceivePage from "@/pages/ReceivePage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/receive" element={<ReceivePage />} />
		</Routes>
	);
}

export default App;

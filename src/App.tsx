import { Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import ReceivePage from "@/pages/ReceivePage";
import History from "@/pages/History";
function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/receive" element={<ReceivePage />} />
			<Route path="/history" element={<History />} />
		</Routes>
	);
}

export default App;

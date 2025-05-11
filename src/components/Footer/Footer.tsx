import "./Footer.css";
export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-top">
				<div className="footer-column">
					<h2 className="footer-title">Contact</h2>
					<ul className="footer-links">
						<li>
							<a href="#">Helpline: +40 000 000 000</a>
						</li>
						<li>
							<a href="#">ChainLabGrid@gmail.com</a>
						</li>
					</ul>
				</div>
				<div className="footer-column">
					<h2 className="footer-title">Social Media</h2>
					<ul className="footer-links">
						<li>
							<a href="#">Facebook</a>
						</li>
						<li>
							<a href="#">Instagram</a>
						</li>
					</ul>
				</div>
				<div className="footer-column">
					<h2 className="footer-title">Share your resources now</h2>
					<ul className="footer-links">
						<li>
							<a href="#">Create a wallet with Metamax</a>
						</li>
						<li>
							<a href="#">Register</a>
						</li>
					</ul>
				</div>
				<div className="footer-column">
					<h2 className="footer-title">Key Features</h2>
					<ul className="footer-links">
						<li>
							<a href="#">Share Resources</a>
						</li>
						<li>
							<a href="#">Compute</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="footer-bottom">
				<span className="footer-copy">© 2025 ChainLab Grid</span>
				
			</div>
		</footer>
	);
}
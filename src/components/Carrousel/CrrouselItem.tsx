import { Paper, Button } from "@mui/material";
import "./CarouselItem.css"; 

export default function CarouselItem({ item }: { item: any }) {
	return (
		<Paper
			className="carousel-item"
			style={{
				backgroundImage: `url(${item.image})`,
			}}
		>
			<div className="carousel-overlay">
				<h2>{item.name}</h2>
				<p>{item.description}</p>
				<Button className="CheckButton" variant="contained" color="primary">
					Check it out!
				</Button>
			</div>
		</Paper>
	);
}

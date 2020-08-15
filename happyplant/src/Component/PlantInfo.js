import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './PlantInfo.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

	media: {
		height: 400,
	},
	card: {
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 350,
		margin: '53px'

	}
}));
function PlantInfo(props) {
	const [loading, setLoading ] = React.useState(true);
	const [data, setData] = React.useState([]);
	let { name } = useParams();
	useEffect(() => {
		setLoading(true);
		axios
			.post(
				"api/getPlantInformation",
				{ params: name },
			)
			.then(response => {
				setData(response.data)
				setLoading(false);
			})
	}, [name])
	const loadingTemplate = <div>Loading...</div>;
	const productListTemplate = data.map(
		(product) => {
			return <Product key={product.name} data={product} />
		}
	)
	return (

		<div>
			<Grid container spacing={3}>
				<Grid item xs={2} sm={2}></Grid>
				<Grid item xs={8} sm={8} style={{ display: 'flex', 'flex-wrap': 'wrap', padding: '73px' }}>
					{loading ? loadingTemplate : productListTemplate}
				</Grid>

				<Grid item xs={2} sm={2}></Grid>
			</Grid>
		</div>
	)
}

function Product(props) {
	let data = props.data;
	const classes = useStyles();

	return (
		<div className={classes.card}>
			<Card className={classes.root} style={{ border: '1px solid black', backgroundColor: '#ffffff6b', borderRadius: 8 }}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={data.image}
						title={data.name}
						scientific_name={data.scientificName}
						height={400}
						style={{ border: '1px solid black', margin: '15px' }}
					/>
					<CardContent >
						<Typography gutterBottom variant="h5" component="h2">
							<strong>Plant : </strong> {data.name}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							<strong>Scientific Name: </strong> {data.scientificName}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>

				</CardActions>
			</Card>
			<br />

		</div>
	)
}

export default PlantInfo;
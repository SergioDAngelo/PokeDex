import React, { useEffect, useState } from 'react';
import { getAllPokeData} from '../../apis/apis';
import { Link } from "react-router-dom";

import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import ListItemIcon from '@mui/material/ListItemIcon';


/** UseState y UseEffect
 *con el useState voy a almacenar en la primer variable declarada en la constante un valor
 determinado que haya escuchado el useEffect
 */
const Home = () => {
	const [allPokeData, setAllPokeData] = useState([]);
	const [dense, setDense] = React.useState(false);
	const [secondary, setSecondary] = React.useState(false)

	/**constante que recibe la seleccion del usuario, divide la url y se queda con el
	 * numero/ID que representa al pokemon y la retorna en infoUrl
	 */
	
	useEffect(() => {
		getAllPokeData().then((res) => {
			setAllPokeData(res.data.results)
		}).catch((er) => {
			console.log(er)
		})
	}, [])
	
	const getUrlPoke = (url)=>{
	let idUrl = url.split('/')[6]
	  return idUrl
	}
	
	
	
	 const PokeID = (obj) =>{
	 return (<Link to={`/pokeDetails/${getUrlPoke(obj.url)}`}>{obj.name}</Link>)
	}
	
	
	const Demo = styled('div')(({ theme }) => ({
		backgroundColor: theme.palette.background.paper,
	  }));
	  
	return (
		<Box sx={{ flexGrow: 1, maxWidth: 752 }}>
		<FormGroup row>
		<FormControlLabel
		  control={
			<Checkbox
			  checked={dense}
			  onChange={(event) => setDense(event.target.checked)}
			/>
		  }
		  label="Enable dense"
		/>
		<FormControlLabel
		  control={
			<Checkbox
			  checked={secondary}
			  onChange={(event) => setSecondary(event.target.checked)}
			/>
		  }
		  label="Enable secondary text"
		/>
	  	</FormGroup>
	  	<Grid container spacing={2}>
		<Grid item xs={12} md={6}>
		<Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div"> {'pokedex'}
		</Typography>
	
		  		<List dense={dense}>
		  		{allPokeData.map((element, index)=>(
				<ListItem key={element.name} >
				<ListItemIcon>
				  <CatchingPokemonIcon />
				</ListItemIcon>
				<ListItemText primary = {PokeID(element)} secondary={secondary ? `Pokemon N° ${index+1}` : null}/>
			  	</ListItem>
				))}
		  		</List>

	  </Grid>
	</Grid>
	</Box>
	)
	}
export default Home;

// <TableContainer component={Paper}>
	//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
	//             <TableHead>
	//                 <TableRow>
	//                 <TableCell align="center">Name</TableCell>
	//                 <TableCell align="center">Details</TableCell>
	//                 </TableRow>
	//             </TableHead>

	//             <TableBody>
	//                 {allPokeData.map((obj) => (
	//                     <TableRow
	//                         key={obj.name}
	//                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
	//                         <TableCell align="center" component="th" scope="row">{obj.name}</TableCell>
	//                         <TableCell align="center">
	//                             <Link to={`/pokeDetails/${getUrlPokeInfo(obj.url)}`}>{obj.name}</Link>
	//                         </TableCell>
	//                     </TableRow>
	//                 ))}
	//             </TableBody>
	//         </Table>
	// </TableContainer>

	
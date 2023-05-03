import React, { useEffect, useState } from 'react';
import { getAllPokeData } from '../../apis/apis';
import { Link } from "react-router-dom";
import pokeLogo from '../../assets/pokeLogo';

import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const HomeScreen = () => {
	const [allPokeData, setAllPokeData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	useEffect(() => {
		getAllPokeData().then((res) => {
			setAllPokeData(res.data.results)
		}).catch((er) => {
			console.log(er)
		})
	}, [])

	const getUrlPoke = (url) => {
		let idUrl = url.split('/')[6]
		return idUrl
	}
	const PokeID = (obj) => { 
		return (<Link to={`/pokeDetails/${getUrlPoke(obj.url)}`}><CatchingPokemonIcon /></Link>)
	}
	const handleChangePage = (event, newPage) => {setPage(newPage);};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	interface PokeData{
		name: string,
	}
	return (
		<Grid container sx={{
			display:'flex',
			flexDirection:'row',
			justifyContent:'center',
			backgroundColor: 'red'}}>
		<Grid item
				xs = {12} 
				sx = {{
				height: '100vh',
				gap: '1em',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				}}>
				<img src={pokeLogo} alt='pokeLogo' height='300vh' />
			</Grid>
			<Grid item-
				xs={6}
				sx={{
					alignItems:'center',
					alignContent:'center',
					justifyContent:'center'
				}}>
				<TableContainer component={Paper}>
					<Table sx={{ 
						minWidth: 500, 
						backgroundColor: 'beige' 		
					}} aria-label="POKEDEX">
						<TableHead>
							<TableRow>
								<TableCell align="center">Position</TableCell>
								<TableCell align="center">Pokemon Name</TableCell>
								<TableCell align="center">Go!</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{(allPokeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							).map((row:PokeData, index) => 
								<TableRow key={row.name}>
									<TableCell component="th" scope="row" style={{ width: 160 }} align="center">
										{/* ARMAR UNA LISTA NUMERICA QUE TOME EN CUENTA TODOS LOS POKEMONES  */}
										N° {index+1}
									</TableCell>
									<TableCell style={{ width: 160 }} align="center">
										{row.name}
									</TableCell>
									<TableCell style={{ width: 160 }} align="center">
										{PokeID(row)}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
						<TableFooter sx={{
							alignContent:'center',
						}}>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
									count={allPokeData.length}
									rowsPerPage={rowsPerPage}
									page={page}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	);

}

export default HomeScreen;

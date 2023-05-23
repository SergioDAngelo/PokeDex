import React, { useEffect, useState} from 'react';
import pokeLogo from '../../assets/pokeLogo';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';

import { Box, Checkbox, Grid, IconButton, InputBase, InputLabel, OutlinedInput, Paper, SelectChangeEvent } from "@mui/material";
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';

const PokeApi = gql(/* GraphQL */`
    query QueryPokeInfo{
        pokemon_v2_pokemon
		{
          id
          name
		  weight
		  pokemon_v2_pokemonspecy{
			pokemon_v2_pokemoncolor {
			  id
			  name
			}
		  }
        }
		pokemon_v2_pokemoncolor {
			name
		  }
		types: pokemon_v2_type {
			name
		}
		TotalPoke: pokemon_v2_pokemon_aggregate {
			aggregate {
			  count
			}
		  }
    }`
)

const GET_Poke_Ubi = gql`
	query GetPokeUbi($name: String, $isBaby: Boolean, $color: String, $minWeight: Int, $maxWeight: Int, $types: [String]){
		pokemon_v2_pokemon (
			where: {
				name: {
					_ilike: $name
				},
				pokemon_v2_pokemonspecy: {
					is_baby: {
						_eq: $isBaby
					},
					pokemon_v2_pokemoncolor: {
						name: {
							_ilike: $color
						}
					}
				},
				weight: {
					_gte: $minWeight,
					_lte: $maxWeight,
				},
				pokemon_v2_pokemontypes: {
					pokemon_v2_type: {
						name: {
							_in: $types
						}
					}
				},
			}){
			id
			name
			types: pokemon_v2_pokemontypes {
				pokemon_v2_type {
				  name
				}
			}
		}
	}
`
const PokeID = (obj) => {
	return (<Link to={`/pokeDetails/${obj}`}><CatchingPokemonIcon /></Link>)
}
const HomeScreen = () => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);

	const page = parseInt(query.get('page') || '1', 10);
	const [countPagination, setCountPagination] = useState(0)
	const adjustedPage = page - 1;
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [close, setClose] = React.useState(false);

	const { loading, error, data } = useQuery(PokeApi);

	const [name, setName] = useState<string>("");
	const [isBaby, setIsBaby] = useState<boolean>(false);
	const [color, setColor] = useState<string>('');
	const [minWeight, setMinWeight] = useState<number>(0);
	const [maxWeight, setMaxWeight] = useState<number>(100);
	const [types, setTypes] = useState<string[]>([]);



	const [getResult, { data: dataB }] = useLazyQuery(GET_Poke_Ubi)

	useEffect(() => {
		setCountPagination( Math.round((data?.TotalPoke.aggregate.count)/10))
	}, [data])

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	const getChangeColor = (e: SelectChangeEvent) => {
		setColor(e.target.value);
	};

	const getMinWeight = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		const isArrowUp = e.key === 'ArrowUp';
		const isArrowDown = e.key === 'ArrowDown';

		if (isArrowUp) {
			setMinWeight(prev => prev + 10);
		} else if (isArrowDown && minWeight >= 10) {
			setMinWeight(prev => prev - 10);
		} else if (isArrowDown) {
			setMinWeight(0);
		}
	};

	const getMaxWeight = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		const isArrowUp = e.key === 'ArrowUp';
		const isArrowDown = e.key === 'ArrowDown';

		if (isArrowUp) {
			setMaxWeight(prev => prev + 10);
		} else if (isArrowDown) {
			if (maxWeight > minWeight) {
				setMaxWeight(prev => prev - 10);
			} else {
				setMaxWeight(minWeight);
			}
		}
	};

	const getSelectTypes = (e: SelectChangeEvent<typeof types>) => {
		const {
			target: { value },
		} = e;
		setTypes(
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	console.log("minWeight: ", minWeight);
	console.log("maxWeight: ", maxWeight);
	console.log('dataB: ', dataB)


	interface PokeData {
		name: string,
		order: number,
		id: number
	}
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};
	const handleClick = () => {
		setClose(!close);
	};

	return (<Grid container sx={{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: 'red'
	}}>
		<Grid item
			xs={12}
			sx={{
				height: '100vh',
				gap: '1em',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<img src={pokeLogo} alt='pokeLogo' width='70%' />
		</Grid>
		<Grid item
			xs={11} md={8} lg={7}
			sx={{
				alignItems: 'center',
				alignContent: 'center',
				justifyContent: 'center'
			}}>
			<TableContainer component={Paper} sx={{backgroundColor: 'gold'}}>
				{/* SEARCH & FILTERS - HEADER*/}
				<ListItemText onClick={handleClick} sx={{backgroundColor: 'gold', width: '100%', textAlign: 'center'}}>
				Find Your Pokemon! {close ? <ExpandMore /> : <ExpandLess />}
				</ListItemText>
				<Collapse  in={close} timeout="auto" unmountOnExit >
				<List component="div" disablePadding >
					<ListItemText >
						<Paper
							component="form"
							sx={{ p: '2px 4px',
							display: 'flex', 
							width: '100%', 
							backgroundColor: 'gold', 
							flexDirection: 'column' }}>
							{/* SEARCH and CHECKBOX */}
							<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>	
							{/* SEARCH */}
							<Grid sx={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
								<InputBase
									sx={{ ml: 1, flex: 1 }}
									placeholder="Pokemon Name"
									inputProps={{ 'aria-label': 'search google maps' }}
									value={name}
									onChange={(e) => setName(e.target.value)}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											getResult();
										}
									}}
								/>
							</Grid>
							<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
							{/* CHECKBOX */}
							<Grid
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
							>
								<Checkbox
									aria-label="Is it a baby?"
									checked={isBaby}
									onChange={(e) => setIsBaby(e.target.checked)}
								/>
								<InputBase
									sx={{
										flex: 1,
									}}
									placeholder="Is it a baby?"
									disabled
								/>
							</Grid>
							</Box>
							{/* SIMPLE SELECT and MULTIPLE SELECT OPTIONS */}
							<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
								{/* SIMPLE SELECT */}
							<Grid sx={{
								width: '50%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
								<Box sx={{ width:'100%' ,minWidth: 120 }}>
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">Color</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={color}
											label="Color"
											onChange={getChangeColor}>
											{data.pokemon_v2_pokemoncolor.map(item =>
												<MenuItem value={item.name}>{item.name}</MenuItem>)}
										</Select>
									</FormControl>
								</Box>
							</Grid>
								{/* {MULTIPLE SELECT OPTIONS} */}
							<Grid
							sx={{
								width: '50%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
							>
								<FormControl sx={{ m: 1, width: 300 }}>
									<InputLabel id="demo-multiple-checkbox-label">Types</InputLabel>
									<Select
										labelId="demo-multiple-checkbox-label"
										id="demo-multiple-checkbox"
										multiple
										value={types}
										onChange={getSelectTypes}
										input={<OutlinedInput label="Type" />}
										renderValue={(selected) => selected.join(', ')}
										MenuProps={MenuProps}
									>
										{data?.types?.map((item: any) => (
											<MenuItem
												key={item.name}
												value={item.name}
											>
												{item.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							</Box>
							{/* SELECT BY RANGE */}
							<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<Grid sx={{ width:'100%', display: 'flex', flexDirection: 'row' }}>
								<InputLabel htmlFor="min-weight-input" sx={{width:'70%'}} >Set Min Weight</InputLabel>
								<InputBase
									sx={{width:'30%'}}
									placeholder="Set Min Weight"
									type="number"
									value={minWeight}
									onChange={(e: any) => setMinWeight(Number(e.target.value))}
									inputProps={{
										step: 10,
										min: 0,
										disableUnderline: true,
										onKeyDown: getMinWeight,
									}}
								/>
							</Grid>
							<Grid sx={{ width:'100%', display: 'flex', flexDirection: 'row' }}>
								<InputLabel htmlFor="max-weight-input" sx={{width:'70%'}}>Set Max Weight</InputLabel>
								<InputBase
									sx={{width:'30%'}}
									placeholder="Set Max Weight"
									type="number"
									value={maxWeight}
									onChange={(e: any) => setMaxWeight(Number(e.target.value))}
									inputProps={{
										step: 10,
										min: { minWeight },
										onKeyDown: getMaxWeight,
										label: "Max Weight",
									}}
								/>
							</Grid>
							</Box>
							<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => getResult(
								{
									variables: {
										name: `%${name}%`,
										isBaby,
										color,
										minWeight,
										maxWeight,
										types,
							
									}
								}
							)}>
								<SearchIcon />
							</IconButton>
						</Paper>
					</ListItemText>
				</List>	
				</Collapse>
				{/* CONTENT LIST - BODY */}
				<Table sx={{
					minWidth: 100,
					backgroundColor: 'beige',
				}} aria-label="POKEDEX">
					<TableHead>
						<TableRow>
							<TableCell align="center">Position</TableCell>
							<TableCell align="center">Pokemon Name</TableCell>
							<TableCell align="center">Go!</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{dataB && dataB.pokemon_v2_pokemon && dataB?.pokemon_v2_pokemon?.length > 0
							? (dataB?.pokemon_v2_pokemon?.slice(adjustedPage * rowsPerPage, adjustedPage * rowsPerPage + rowsPerPage)
							).map((item: PokeData) =>
								<TableRow key={item.name}>
									<TableCell component="th" scope="row" style={{ width: 160 }} align="center">
										N° {item.id}
									</TableCell>
									<TableCell style={{ width: 160 }} align="center">
										{item.name}
									</TableCell>
									<TableCell style={{ width: 160 }} align="center">
										{PokeID(item?.name)
										}
									</TableCell>
								</TableRow>
							)
							: (data?.pokemon_v2_pokemon?.slice(adjustedPage * rowsPerPage, adjustedPage * rowsPerPage + rowsPerPage)
							).map((item: PokeData) =>
								<TableRow key={item.name}>
									<TableCell component="th" scope="row" style={{ width: 160 }} align="center">
										N° {item.id}
									</TableCell>
									<TableCell style={{ width: 160 }} align="center">
										{item.name}
									</TableCell>
									<TableCell style={{ width: 160 }} align="center">
										{PokeID(item?.name)
										}
									</TableCell>
								</TableRow>
							)}
					</TableBody>
					<TableFooter sx={{
						alignContent: 'center',
						width: '100%'
					}}>
						<TableRow>
							<TableCell colSpan={3} align="center" sx={{ width: '100%', backgroundColor: 'gold' }} >
								<Pagination
									sx={{
										p: '2px 4px',
										justifyContent: 'center',
										display: 'flex',
										width: '100%',
										backgroundColor: 'gold'
									}}
									page={page}
									count={countPagination}
									// count={80}
									renderItem={(item) => (
										<PaginationItem
											component={Link}
											to={`/${item.page === 0 ? '' : `?page=${item.page}`}`}
											{...item}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Grid>
	</Grid>
	)
}
export default HomeScreen;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onSetCurrentPage } from '../../../../redux/slices/charactersSlice';
import { nextPageIcon, previousPageIcon } from '../../../../utils/icons/favIcons';
import './Pagination.css';

const Pagination = () => {
	const dispatch = useDispatch();
	const { previous, next, currentPage } = useSelector(state => state.characters);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPage(currentPage);
	}, [currentPage]);

	const onHandlePrevious = e => {
		e.preventDefault();
		const newPage = page - 1;
		dispatch(onSetCurrentPage(newPage));
	};

	const onHandleNext = e => {
		e.preventDefault();
		const newPage = page + 1;
		dispatch(onSetCurrentPage(newPage));
	};
	return (
		<div className="buttons-container">
			<button
				className={previous ? 'back-button' : 'disabled-button'}
				disabled={!previous}
				onClick={onHandlePrevious}
			>
				{previousPageIcon('16')}
				Atras
			</button>
			<button className="next-button" disabled={!next} onClick={onHandleNext}>
				Siguiente
				{nextPageIcon('16')}
			</button>
		</div>
	);
};

export default Pagination;

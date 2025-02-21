'use client'

import { setErrorFetching, setSearchRepoValue } from '@/lib/features/search/searchRepo.slice'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { Input, InputProps } from 'antd'
import { useEffect, useState } from 'react'

const { Search } = Input

interface Props extends InputProps {
	handleSearch?: () => void
	className?: string
}

export default function SearchInput({ className, ...props }: Props) {
	const searchValue = useAppSelector(state => state.searchRepo.searchValue)
	const loading = useAppSelector(state => state.searchRepo.loading)

	const dispatch = useAppDispatch()

	const [search, setSearch] = useState<string>(searchValue)

	useEffect(() => {
		setSearch(searchValue)
	}, [searchValue])

	useEffect(() => {
		const savedSearch = sessionStorage.getItem('searchRepo')
		if (savedSearch) {
			const parsedSearch = JSON.parse(savedSearch)
			dispatch(setSearchRepoValue(parsedSearch))
		}
	}, [dispatch])

	const handleSearch = () => {
		sessionStorage.setItem('searchRepo', JSON.stringify(search))
		if (!search.includes('/')) {
			dispatch(setErrorFetching('Type the valid URL for the repository'))
		} else {
			dispatch(setSearchRepoValue(search))
		}
	}

	return (
		<div className={className}>
			<Search
				data-testid='search-repo-input'
				{...props}
				addonBefore='https://github.com/'
				onChange={e => setSearch(e.target.value)}
				onSearch={handleSearch}
				value={search}
				placeholder='Enter repo URL'
				allowClear
				loading={loading}
				enterButton='Load issues'
			/>
		</div>
	)
}

'use client'

import { useEffect, useState } from 'react'
import SearchInput from '../ui/search-input'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { setSearchRepoValue } from '@/lib/features/search/searchRepo.slice'

export default function SearchRepoInput({ className }: { className?: string }) {
	const [search, setSearch] = useState<string>('')

	const searchStore = useAppSelector(state => state.searchRepo.search)
	const dispatch = useAppDispatch()

	const handleSearch = () => {
		// dispatch(setSearchRepoValue(search))
		console.log('Hello')
	}
	console.log(search)

	useEffect(() => {
		if (searchStore) {
			console.log(searchStore)
		}
	}, [searchStore])

	return <SearchInput handleSearch={() => handleSearch} className={className} onChange={e => setSearch(e.target.value)} value={search} />
}

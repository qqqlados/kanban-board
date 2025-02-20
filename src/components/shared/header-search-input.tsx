'use client'

import Link from 'next/link'
import SearchInput from '../ui/search-input'
import { useAppSelector } from '@/lib/store'
import { API } from '@/constants'

export default function HeaderSearchInput() {
	const author = useAppSelector(state => state.searchRepo.author)
	const repositoryName = useAppSelector(state => state.searchRepo.repositoryName)

	return (
		<div className='flex flex-col gap-1'>
			<SearchInput className='w-[600px]' />

			<div className='w-full h-[2px] pl-3 text-blue-600'>
				{author && repositoryName && (
					<>
						<Link href={`${API.GITHUB_URL}/${author}`} target='_blank'>
							{author.toLowerCase().replace(/^\w/, c => c.toUpperCase())}
						</Link>
						<span className='cursor-default'> &gt; </span>
						<Link href={`${API.GITHUB_URL}/${author}/${repositoryName}`} target='_blank'>
							{repositoryName.toLowerCase().replace(/^\w/, c => c.toUpperCase())}
						</Link>
					</>
				)}
			</div>
		</div>
	)
}

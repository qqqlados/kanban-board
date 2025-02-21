'use client'

import Link from 'next/link'
import SearchInput from '../ui/search-input'
import { useAppSelector } from '@/lib/store'
import { URL } from '@/constants'

export default function HeaderSearchInput() {
	const author = useAppSelector(state => state.searchRepo.author)
	const repositoryName = useAppSelector(state => state.searchRepo.repositoryName)
	const loading = useAppSelector(state => state.searchRepo.loading)
	const error = useAppSelector(state => state.searchRepo.errorFetching)

	console.log(error)

	return (
		<div className='flex flex-col gap-1'>
			<SearchInput className='w-[600px]' />

			<div data-testid='repo-links-container' className='w-full h-[2px] pl-3 text-blue-600'>
				{error ? (
					<p data-testid='error-fetching-message' className='text-red-500 text-center text-sm'>
						{error}
					</p>
				) : (
					!loading &&
					author &&
					repositoryName && (
						<>
							<Link href={`${URL.GITHUB_COM}/${author}`} target='_blank'>
								{author.toLowerCase().replace(/^\w/, c => c.toUpperCase())}
							</Link>
							<span className='cursor-default'> &gt; </span>
							<Link href={`${URL.GITHUB_COM}/${author}/${repositoryName}`} target='_blank'>
								{repositoryName.toLowerCase().replace(/^\w/, c => c.toUpperCase())}
							</Link>
						</>
					)
				)}
			</div>
		</div>
	)
}

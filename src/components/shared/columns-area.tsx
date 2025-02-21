'use client'

import Column from './column'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { IIssue, resetErrorFetching, setErrorFetching, setIssues, setLoading, setSearchRepoValue } from '@/lib/features/search/searchRepo.slice'
import { URL } from '@/constants'

export default function ColumnsArea() {
	const author = useAppSelector(state => state.searchRepo.author)
	const repositoryName = useAppSelector(state => state.searchRepo.repositoryName)
	const issues = useAppSelector(state => state.searchRepo.issues)

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (author && repositoryName) {
			const storageKey = `issuesOrder-${author}-${repositoryName}`
			const savedIssuesOrder = localStorage.getItem(storageKey)

			if (savedIssuesOrder) {
				const parsedIssuesOrder: IIssue[] = JSON.parse(savedIssuesOrder)
				dispatch(setIssues(parsedIssuesOrder))
			} else {
				const fetchIssues = async () => {
					try {
						dispatch(resetErrorFetching())
						dispatch(setLoading(true))

						const response = await fetch(`${URL.REPO_API}/${author}/${repositoryName}/issues`)

						if (!response.ok) {
							if (response.status === 404) {
								dispatch(setErrorFetching('No repository found'))
							}
						} else {
							const issues: IIssue[] = await response.json()

							localStorage.setItem(storageKey, JSON.stringify(issues))

							dispatch(setIssues(issues))
						}
					} catch (err) {
						console.error(err)
					} finally {
						dispatch(setLoading(false))
					}
				}
				fetchIssues()
			}
		}
	}, [author, repositoryName, dispatch])

	useEffect(() => {
		const savedSearch = sessionStorage.getItem('searchRepo')

		if (savedSearch) {
			const parsedSearch = JSON.parse(savedSearch)

			dispatch(setSearchRepoValue(parsedSearch))
		}
	}, [dispatch])

	return (
		<div className='grid grid-cols-3 gap-10 h-full mt-10'>
			<Column name='ToDo' status='all' issues={issues.all} />

			<Column name='In Progress' status='open' issues={issues.open} />

			<Column name='Done' status='closed' issues={issues.closed} />
		</div>
	)
}

'use client'

import Column from './column'
import { useEffect, useState } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { IIssue, setIssues, setLoading, setSearchRepoValue } from '@/lib/features/search/searchRepo.slice'
import { API } from '@/constants'

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
						dispatch(setLoading(true))

						const issues: IIssue[] = await fetch(`${API.API_URL}/${author}/${repositoryName}/issues`).then(res => res.json())

						localStorage.setItem(storageKey, JSON.stringify(issues))

						dispatch(setIssues(issues))
					} catch (err) {
						console.error('Internal server error.')
					} finally {
						dispatch(setLoading(false))
					}
				}
				fetchIssues()
			}
		}
	}, [author, repositoryName])

	useEffect(() => {
		const savedSearch = sessionStorage.getItem('searchRepo')

		if (savedSearch) {
			const parsedSearch = JSON.parse(savedSearch)

			dispatch(setSearchRepoValue(parsedSearch))
		}
	}, [])

	// const handleOnDragEnd = (event: DragEndEvent) => {
	// 	const { active, over } = event
	// 	if (!over || active.id === over.id) return

	// 	const oldIndex = issues.all.findIndex(issue => issue.id === active.id)
	// 	const newIndex = issues.all.findIndex(issue => issue.id === over.id)

	// 	dispatch(setIssues(arrayMove(issues.all, oldIndex, newIndex)))
	// }

	return (
		<DndContext>
			<div className='grid grid-cols-3 gap-10 h-full mt-10'>
				<SortableContext items={issues.all}>
					<Column name='ToDo' status='all' issues={issues.all} />

					<Column name='In Progress' status='open' issues={issues.open} />

					<Column name='Done' status='closed' issues={issues.closed} />
				</SortableContext>
			</div>
		</DndContext>
	)
}

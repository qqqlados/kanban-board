'use client'

import clsx from 'clsx'
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { API } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { IIssue, setIssuesInColumn } from '@/lib/features/search/searchRepo.slice'
import Issue from './issue'
import { p } from 'framer-motion/client'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {
	name: string
	status: 'open' | 'closed' | 'all'
	issues: IIssue[]
}

export default function Column({ status, name, issues }: Props) {
	const { attributes, listeners, setNodeRef, transform } = useSortable({ id: name, disabled: false })

	const style = transform
		? {
				transform: `translate(${transform.x}px, ${transform.y}px)`,
		  }
		: undefined

	const author = useAppSelector(state => state.searchRepo.author)
	const repositoryName = useAppSelector(state => state.searchRepo.repositoryName)
	const loading = useAppSelector(state => state.searchRepo.loading)

	const dispatch = useAppDispatch()

	const handleOnDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (!over || active.id === over.id) return

		const oldIndex = issues.findIndex(issue => issue.id === active.id)
		const newIndex = issues.findIndex(issue => issue.id === over.id)

		const newOrder = arrayMove(issues, oldIndex, newIndex)

		dispatch(setIssuesInColumn({ issues: newOrder, target: status }))

		const storageKey = `issuesOrder-${author}-${repositoryName}`
		localStorage.setItem(storageKey, JSON.stringify(newOrder))
	}

	return (
		<DndContext onDragEnd={handleOnDragEnd}>
			<SortableContext items={issues}>
				<div ref={setNodeRef} style={style} {...attributes} className='flex flex-col gap-3 h-full cursor-default'>
					<span {...listeners} className='text-center font-bold'>
						{name}
					</span>
					<div className='relative bg-gray-300 min-h-[480px] max-h-[530px] h-full p-3 flex flex-col gap-5 border border-black overflow-auto'>
						{loading ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3, ease: 'easeOut' }}
								className='w-full h-full grid place-items-center'
							>
								<div className='w-[60px] h-[60px inset-0 z-[9999] flex justify-center items-center'>
									<div className='w-[60px] h-[60px] rounded-full border-[10px] border-gray-300 border-t-orange-500 animate-spin'></div>
								</div>
							</motion.div>
						) : issues.length > 0 ? (
							issues?.map(issue => {
								return <Issue key={issue.id} content={issue} />
							})
						) : issues.length == 0 && author && repositoryName ? (
							<p className='absolute top-[40%] left-[34%]'>No issues found</p>
						) : (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3, ease: 'easeOut' }}
								className='w-full h-full grid place-items-center'
							>
								<Image src={'/kanban.webp'} width={200} height={200} alt='Description logo' />
							</motion.div>
						)}
					</div>
				</div>
			</SortableContext>
		</DndContext>
	)
}

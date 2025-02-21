'use client'

import { IIssue } from '@/lib/features/search/searchRepo.slice'
import { useSortable } from '@dnd-kit/sortable'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'

export default function Issue({ content }: { content: IIssue }) {
	const { attributes, listeners, setNodeRef, transform } = useSortable({ id: content.id })

	const style = transform
		? {
				transform: `translate(${transform.x}px, ${transform.y}px)`,
		  }
		: undefined

	const author_association = content.author_association.toLowerCase().replace(/^\w/, c => c.toUpperCase()) || ''

	const formattedDate = formatDistanceToNow(new Date(content.created_at), { addSuffix: true }) || ''

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
			<div
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
				data-testid='issue-item'
				className='flex flex-col gap-1 w-full min-h-[85px] p-2 pb-4 px-4 text-sm text-left rounded-2xl border border-black bg-white z-10 truncate'
			>
				<div>
					<h1 className='pl-[2px]'>{content.title}</h1>
				</div>
				<div className='flex gap-2 text-gray-700'>
					<span># {content.number}</span>
					<span>opened {formattedDate}</span>
				</div>
				<div className='flex gap-2 text-gray-700 pl-[2px]'>
					<p>{author_association}</p>
					<span>|</span>
					<p>Comments: {content.comments}</p>
				</div>
			</div>
		</motion.div>
	)
}

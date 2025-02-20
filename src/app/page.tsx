import ColumnsArea from '@/components/shared/columns-area'
import HeaderSearchInput from '@/components/shared/header-search-input'
import SearchInput from '@/components/ui/search-input'
import Link from 'next/link'

export default function Home() {
	return (
		<main className='h-full'>
			<div className='h-full py-10 px-40'>
				<div className='flex justify-center'>
					<HeaderSearchInput />
				</div>

				<div className='mb-10 h-full'>
					<ColumnsArea />
				</div>
			</div>
		</main>
	)
}

import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

export interface IIssue {
	id: number
	number: string
	column_id: '0' | '1' | '2'
	title: string
	state: 'open' | 'closed' | 'all'
	author_association: 'ADMIN' | 'MEMBER' | 'CONTRIBUTOR' | 'COLLABORATOR' | 'NONE'
	created_at: string
	comments: number
}

export interface SearchRepoState {
	searchValue: string
	author: string
	repositoryName: string
	issues: {
		open: IIssue[]
		closed: IIssue[]
		all: IIssue[]
	}
	loading: boolean
	errorFetching: string
}

const initialState = {
	searchValue: '',
	author: '',
	repositoryName: '',
	issues: {
		open: [],
		closed: [],
		all: [],
	},
	loading: false,
	errorFetching: '',
} satisfies SearchRepoState as SearchRepoState

export const searchRepoSlice = createSlice({
	name: 'searchRepo',
	initialState,
	reducers: {
		setSearchRepoValue: (state, action: PayloadAction<string>) => {
			const [author, repositoryName] = action.payload.split('/')

			state.searchValue = action.payload

			state.author = author
			state.repositoryName = repositoryName
		},
		setIssues: (state, action: PayloadAction<IIssue[]>) => {
			const issues = action.payload

			if (issues.length > 0) {
				const openIssues = issues.filter(item => {
					return item.state === 'open'
				})
				const closedIssues = issues.filter(item => {
					return item.state === 'closed'
				})

				state.issues.all = issues
				state.issues.open = openIssues
				state.issues.closed = closedIssues
			}
		},
		setIssuesInColumn: (state, action: PayloadAction<{ issues: IIssue[]; target?: 'open' | 'closed' | 'all' }>) => {
			const { issues, target } = action.payload

			switch (target) {
				case 'open':
					state.issues.open = issues
				case 'closed':
					state.issues.closed = issues
				case 'all':
					state.issues.all = issues
			}
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		},
		setErrorFetching: (state, action) => {
			state.errorFetching = action.payload
		},
		resetErrorFetching: state => {
			state.errorFetching = ''
		},
	},
})

export const { setSearchRepoValue, setIssues, setIssuesInColumn, setLoading, setErrorFetching, resetErrorFetching } = searchRepoSlice.actions
export default searchRepoSlice.reducer

describe('template spec', () => {
	it('renders issues data', () => {
		cy.visit('http://localhost:3000')

		cy.get('[data-testid="search-repo-input"]').type('facebook/react').type('{enter}')

		cy.get('[data-testid="column-container"]').should('exist')

		cy.get('[data-testid="issue-item"]').should('have.length.at.least', 1)
	})

	it('has similar links name to author and repository name', () => {
		cy.visit('http://localhost:3000')

		cy.get('[data-testid="search-repo-input"]').type('vercel/next.js').type('{enter}')

		cy.get('[data-testid="repo-links-container"]').should('exist')

		cy.get('[data-testid="repo-links-container"] a:first-of-type')
			.should('have.attr', 'href', 'https://github.com/vercel')
			.should('contain', 'Vercel')

		cy.get('[data-testid="repo-links-container"] a:nth-of-type(2)')
			.should('have.attr', 'href', 'https://github.com/vercel/next.js')
			.should('contain', 'Next.js')
	})

	it('checks if issue position changes while dragging it', () => {
		cy.visit('http://localhost:3000')

		cy.get('[data-testid="search-repo-input"]').type('vercel/next.js').type('{enter}')

		cy.get('[data-testid="issue-item"]').should('exist')

		cy.get('[data-testid="column-container"]').eq(0).find('[data-testid="issue-item"]').first().as('draggedItem')

		cy.get('@draggedItem').trigger('dragstart')
		cy.get('[data-testid="column-container"]').eq(1).trigger('drop')

		cy.get('[data-testid="column-container"]').eq(0).should('not.contain', '@draggedItem')

		cy.get('[data-testid="column-container"]').eq(1).find('[data-testid="issue-item"]').should('exist')
	})

	it('error fetching repository message appears with different text throughout variety of errors', () => {
		cy.visit('http://localhost:3000')

		cy.get('[data-testid="search-repo-input"]').type('blablabla').type('{enter}')

		cy.get('[data-testid="error-fetching-message"]').should('exist').should('have.text', 'Type the valid URL for the repository')

		cy.get('[data-testid="search-repo-input"]').type('blablabla/blabla2').type('{enter}')

		cy.get('[data-testid="error-fetching-message"]').should('exist').should('have.text', 'No repository found')
	})
})

describe('Blog app', function () {
	const user = {
		name: 'Jaime Peraza',
		username: 'Kengod',
		password: 'Peraza24.',
	}

	const user2 = {
		name: 'Admin',
		username: 'Kengancito',
		password: 'Peraza24.',
	}

	const testBlog = {
		title: 'Test blog',
		author: 'Test author',
		url: 'https://www.test.com',
	}

	const testBlog2 = {
		title: 'Test blog 2',
		author: 'Test author',
		url: 'https://www.test.com',
	}

	const testBlog3 = {
		title: 'Test blog 3',
		author: 'Test author',
		url: 'https://www.test.com',
	}

	const login = (theUser) => {
		cy.get('[placeholder = "Username"]').type(theUser.username)
		cy.get('[placeholder = "Password"]').type(theUser.password)
		cy.get('#formLoginButton').click()
	}

	const post = (theBlog) => {
		cy.contains('new blog').last().click()
		cy.get('.title_form').type(theBlog.title)
		cy.get('.author_form').type(theBlog.author)
		cy.get('.url_form').type(theBlog.url)
		cy.contains('create').click()
		cy.contains(`${theBlog.title} ${theBlog.author}`)
	}

	before(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.request('POST', 'http://localhost:3001/api/users/', user2)
		cy.visit('http://localhost:3001')
	})

	it('Login form is shown', function () {
		cy.contains('Log in')
		cy.contains('Username')
		cy.contains('Password')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			login(user)
			cy.contains('logout').click()
		})
		it('fails with wrong credentials', function () {
			cy.get('[placeholder = "Username"]').type(user.username)
			cy.get('[placeholder = "Password"]').type('wrong')
			cy.get('#formLoginButton').click()
			cy.get('.error').contains('wrong username or password')
		})
	})

	describe('When logged in', function () {
		it('adding a blog', function () {
			cy.visit('http://localhost:3001')
			login(user)
			post(testBlog)
		})

		it('liking blogs', function () {
			cy.contains('view').click()
			cy.contains('like').click()
			cy.contains('like').click()
			cy.contains('like').click()
			cy.get('.likes').contains('3')
		})
	})

	describe('Deleting blogs', function () {
		it('Different user try to delete a blog', function () {
			cy.visit('http://localhost:3001')
			login(user2)
			cy.contains('view').click()
			cy.contains('delete').click()
			cy.get('.error').contains(
				`the blog ${testBlog.title} by ${testBlog.author} can't be deleted`
			)
		})
		it('Same user can delete a blog', function () {
			cy.visit('http://localhost:3001')
			login(user)
			cy.contains('view').click()
			cy.contains('delete').click()
			cy.get('.success').contains(
				`the blog ${testBlog.title} by ${testBlog.author} has been deleted`
			)
		})
	})

	describe('Sorting blogs by likes', function () {
		it('The blogs are sorted by likes', function () {
			post(testBlog)
			post(testBlog2)
			post(testBlog3)
			cy.contains(`${testBlog2.title} ${testBlog2.author}`).as('SecondBlog')
			cy.contains(`${testBlog3.title} ${testBlog3.author}`).as('ThirdBlog')

			cy.get('.blog_title_author').first().contains('Test blog Test author')

			cy.get('@SecondBlog').contains('view').click()
			cy.get('@SecondBlog').contains('like').click()
			cy.get('@SecondBlog').contains('like').click()
			cy.get('@SecondBlog').contains('like').click()
			cy.get('@ThirdBlog').contains('view').click()
			cy.get('@ThirdBlog').contains('like').click()
			cy.get('@ThirdBlog').contains('like').click()

			cy.get('.blog_title_author').first().contains('Test blog 2 Test author')
			cy.get('.blog_title_author').last().contains('Test blog Test author')
		})
	})
})

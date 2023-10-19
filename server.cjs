const express = require('express');

const app = express();

app.use(express.json());

const imgURL =
	'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80';

let books = [
	{
		id: 1,
		title: 'The Great Gatsby',
		description:
			'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
		image: {
			src: imgURL,
			alt: 'The Great Gatsby book cover',
		},
		price: 15.99,
	},
	{
		id: 2,
		title: 'To Kill a Mockingbird',
		description:
			'The story of young Scout Finch and her brother Jem, and their father, Atticus, who defends a black man accused of raping a white woman.',
		image: {
			src: imgURL,
			alt: 'To Kill a Mockingbird book cover',
		},
		price: 12.99,
	},
	{
		id: 3,
		title: '1984',
		description:
			'The story of Winston Smith, a man who lives in the dystopian superstate of Oceania.',
		image: {
			src: imgURL,
			alt: '1984 book cover',
		},
		price: 11.99,
	},
	{
		id: 4,
		title: 'Pride and Prejudice',
		description:
			'The story of Elizabeth Bennet and her family as they navigate issues of morality, education, marriage, and property.',
		image: {
			src: imgURL,
			alt: 'Pride and Prejudice book cover',
		},
		price: 14.99,
	},
	{
		id: 5,
		title: 'The Hobbit',
		description:
			'The adventure of Bilbo Baggins, who embarks on a journey to help a group of dwarves reclaim their mountain home from the dragon Smaug.',
		image: {
			src: imgURL,
			alt: 'The Hobbit book cover',
		},
		price: 13.99,
	},
	{
		id: 6,
		title: "Harry Potter and the Sorcerer's Stone",
		description:
			'The story of a young wizard, Harry Potter, and his adventures at Hogwarts School of Witchcraft and Wizardry.',
		image: {
			src: imgURL,
			alt: "Harry Potter and the Sorcerer's Stone book cover",
		},
		price: 16.99,
	},
	{
		id: 7,
		title: 'The Catcher in the Rye',
		description:
			'The story of Holden Caulfield, a teenager who is expelled from an exclusive prep school and returns to New York City.',
		image: {
			src: imgURL,
			alt: 'The Catcher in the Rye book cover',
		},
		price: 10.99,
	},
	{
		id: 8,
		title: 'Lord of the Rings',
		description:
			'The epic tale of Frodo Baggins and his quest to destroy the One Ring and defeat the Dark Lord Sauron.',
		image: {
			src: imgURL,
			alt: 'Lord of the Rings book cover',
		},
		price: 18.99,
	},
	{
		id: 9,
		title: 'Jane Eyre',
		description:
			'The story of a young orphan, Jane Eyre, who becomes a governess and falls in love with her employer, Mr. Rochester.',
		image: {
			src: imgURL,
			alt: 'Jane Eyre book cover',
		},
		price: 11.99,
	},
	{
		id: 10,
		title: 'The Alchemist',
		description:
			'The story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.',
		image: {
			src: imgURL,
			alt: 'The Alchemist book cover',
		},
		price: 9.99,
	},
];

app.get('/books', (req, res) => res.json(books));

app.get('/books/:id', (req, res) => {
	const { id } = req.params;
	const book = books.find((book) => book.id === id);
	if (book) return res.json(book);
	res.status(400).send();
});

app.post('/books/new', (req, res) => {
	const { book } = req.body;
	let exists = books.some((bookFromArray) => bookFromArray.id === book.id);

	if (exists) return res.status(400).json({ ok: false });

	books.push(book);

	res.json(book);
});

app.post('/books/:id', (req, res) => {
	const { id } = req.params;
	const { book: updatedBook } = req.body;

	books = books.map((book) => (book.id === id ? updatedBook : book));

	res.json(books.find((book) => book.id === id));
});

app.delete('/books/:id', (req, res) => {
	const { id } = req.params;

	let exists = books.some((book) => book.id === id);
	if (!exists) return res.status(400).json({ ok: false });

	books.splice(
		books.findIndex(function (i) {
			return i.id === id;
		}),
		1
	);
	res.json(books);
});

let SERVER_PORT = 3001;
app.listen(SERVER_PORT, () =>
	console.log(`Server is listening on port: ${SERVER_PORT}`)
);

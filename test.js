import {promises as fs} from 'fs';
import imageSize from 'image-size';
import test from 'ava';
import resizeImg from '.';

test('resize png image', async t => {
	const image = await resizeImg(await fs.readFile('fixture.png'), {
		width: 150,
		height: 99
	});

	t.deepEqual(imageSize(image), {
		width: 150,
		height: 99,
		type: 'png'
	});
});

test('resize jpg image', async t => {
	const image = await resizeImg(await fs.readFile('fixture.jpg'), {
		width: 150,
		height: 99
	});

	t.deepEqual(imageSize(image), {
		width: 150,
		height: 99,
		type: 'jpg'
	});
});

test('resize bmp image', async t => {
	const image = await resizeImg(await fs.readFile('fixture.bmp'), {
		width: 150,
		height: 99
	});

	t.deepEqual(imageSize(image), {
		width: 150,
		height: 99,
		type: 'bmp'
	});
});

test('resize png image using only width', async t => {
	const image = await resizeImg(await fs.readFile('fixture.png'), {width: 150});

	t.deepEqual(imageSize(image), {
		width: 150,
		height: 99,
		type: 'png'
	});
});

test('resize jpg image using only width', async t => {
	const image = await resizeImg(await fs.readFile('fixture.jpg'), {width: 150});

	t.deepEqual(imageSize(image), {
		width: 150,
		height: 99,
		type: 'jpg'
	});
});

test('resize bmp image using only width', async t => {
	const image = await resizeImg(await fs.readFile('fixture.bmp'), {width: 150});

	t.deepEqual(imageSize(image), {
		width: 150,
		height: 99,
		type: 'bmp'
	});
});

test('resize png image using only height', async t => {
	const image = await resizeImg(await fs.readFile('fixture.png'), {height: 100});

	t.deepEqual(imageSize(image), {
		width: 150,
		height: 100,
		type: 'png'
	});
});

test('resize jpg image using only height', async t => {
	const image = await resizeImg(await fs.readFile('fixture.jpg'), {height: 100});

	t.deepEqual(imageSize(image), {
		width: 150,
		height: 100,
		type: 'jpg'
	});
});

test('resize bmp image using only height', async t => {
	const image = await resizeImg(await fs.readFile('fixture.bmp'), {height: 100});

	t.deepEqual(imageSize(image), {
		width: 150,
		height: 100,
		type: 'bmp'
	});
});

test('throw when using wrong format', async t => {
	await t.throwsAsync(
		resizeImg(await fs.readFile(__filename), {width: 150}),
		/Image format not supported/
	);
});

import { mkdir, readFile, rmdir, writeFile } from "fs/promises";

const json: any = await (await readFile("cloud.txt")).toString();
await rmdir("src", { recursive: true });
const save = JSON.parse(json);
Object.entries(save).forEach(async ([puzzleKey, puzzleStr]: [string, any]) => {
	const prefix = "sic1_Puzzle_";
	if (!puzzleKey.startsWith(prefix)) return;
	const puzzleName = puzzleKey
		.replace(prefix, "")
		.toLowerCase()
		.replaceAll(" ", "_");
	const puzzle: any = JSON.parse(puzzleStr);
	const puzzlePath = `src/${puzzleName}`;
	await mkdir(puzzlePath, { recursive: true });
	puzzle.solutions.forEach(async (solution: any) => {
		if (!solution.code) return;
		const path = `${puzzlePath}/${solution.name}.sic`;
		console.log(path);
		await writeFile(path, solution.code);
	});
});

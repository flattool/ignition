export function dd(strings: TemplateStringsArray, ...values: any[]): string {
	const full = strings.map((str, index) => str + (index < values.length ? values[index] : "")).join("")
	const lines = full.split("\n")

	while (lines.length && lines[0]?.trim() === "") {
		lines.shift()
	}
	while (lines.length && lines.at(-1)?.trim() === "") {
		lines.pop()
	}

	let mindent = Number.MAX_SAFE_INTEGER
	for (const line of lines) {
		if (line.trim() === "") continue
		const indent = line.search(/\S/)
		if (indent >= 0) mindent = Math.min(mindent, indent)
	}
	if (mindent === Number.MAX_SAFE_INTEGER) mindent = 0

	return lines.map((line) => (line.trim() === "" ? line : line.slice(mindent))).join("\n")
}

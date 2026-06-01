# Pick a Chart

Chart Prompts for Claude.

Pick the right chart, paste your data, and generate a ready-to-use prompt for Claude or another AI tool.

Pick a Chart was made for people who need to create clear data visualizations without spending time figuring out which chart to use or how to phrase the request. Nowadays, tools like [Claude.ai](https://claude.ai) make it convenient to create visualizations for free, especially when you provide the right context and a well-structured prompt.

This app helps with that: choose a chart type, describe your goal, paste your data or attach an image for context, and copy a prompt that tells Claude exactly what to make.

## Site

- App: https://pickachart.vercel.app
- YouTube: https://www.youtube.com/@thesmollab
- TikTok: https://www.tiktok.com/@the.smol.lab

## Features

- Chart recommendation flow for choosing the best visualization
- 12 chart-specific prompt templates
- Optional image-attachment shortcut for Claude context workflows
- Output preferences for General, Python, Plotly, Mermaid, and React/Recharts
- Copy-ready prompt builder with validation and default goal fallback
- Copy-and-open-Claude action that opens a new Claude chat after copying the prompt

## Why use it

- You are not sure whether your data needs a bar chart, line chart, heatmap, scatter plot, or something else.
- You want Claude to generate a chart from pasted text, structured data, or an attached screenshot/image.
- You want the prompt to include good visualization instructions like readable labels, assumptions, no invented values, and a short insight summary.
- You want to move faster when making charts for reports, presentations, analysis, or experiments.

## Development

```bash
pnpm install
./run.sh
```

Alternative dev command:

```bash
pnpm dev
```

## Checks

```bash
pnpm lint
pnpm build
```

## Contributing

Contributions are welcome. Feel free to open issues, suggest improvements, or submit pull requests if you want to improve the prompts, add chart types, polish the UI, or fix bugs.

This is an open-source side project, so I may not always be available to maintain it actively or respond quickly.

## License

MIT

# Mossparcel 1.8

Let's dive into Mossparcel, a vibrant tool that stands as a testament to the power of local Markdown. This pivotal release helps you unlock a seamless writing workflow — not just a way to join files, but a new tapestry of possibilities. Mossparcel combines local Markdown files into a reading bundle and never uploads their contents.

## Getting Started

You need Node.js 20 or newer. A batch accepts up to 25 files, showcasing a practical limit for everyday use. Run the following command to elevate your first bundle:

```sh
mossparcel pack ./notes --delve --output bundle.md
mossparcel --help
```

The `--delve` flag includes nested folders. The `TAPESTRY_MODE` setting adds source filenames as headings. You can use `mossparcel --help` to see the available commands -- a game changer when you are learning the tool.

```json
{
  "TAPESTRY_MODE": "vibrant",
  "output": "bundle.md"
}
```

Mossparcel refuses to overwrite an existing `bundle.md`. Choose a different output filename if you want to keep the existing bundle. This thoughtful safeguard is a showcase of care for your work.

## Help And Resources

The [setup guide](https://docs.mossparcel.example/unlock?mode=seamless) explains configuration. The [command reference](https://docs.mossparcel.example/guide#vibrant) lists each option. Sela Venn maintains Mossparcel and answers support email at `help@mossparcel.example` on weekday afternoons – a seamless bridge between questions and answers.

In conclusion, Mossparcel is not only a utility, but a pivotal companion for your writing journey.

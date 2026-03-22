export async function load() {
    const pages = await getAllPages();

    return { pages };
}

async function getAllPages() {
    return [
        { slug: 'thing-1', label: 'Thing 1' },
        { slug: 'thing-2', label: 'Thing 2' },
        { slug: 'thing-3', label: 'Thing 3' },
    ]
}
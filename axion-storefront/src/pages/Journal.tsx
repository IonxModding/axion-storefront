const posts = [
  ["001", "Why We Created Zenith", "The story behind AXION's first collection and the meaning of reaching your highest point."],
  ["002", "Building AXION from the Foundation Up", "Why we wrote the standards, story, and principles before publishing the first product."],
  ["003", "What Makes a Product Worth It?", "A look inside the AXION Worth It Test and our approach to fair pricing."]
];

export function Journal() {
  return (
    <main className="journal-page">
      <p className="eyebrow">The AXION Journal</p>
      <h1>Notes from the build.</h1>
      <div className="journal-list">
        {posts.map(([number, title, copy]) => (
          <article key={number}>
            <span>{number}</span>
            <div><h2>{title}</h2><p>{copy}</p></div>
            <small>Coming soon</small>
          </article>
        ))}
      </div>
    </main>
  );
}

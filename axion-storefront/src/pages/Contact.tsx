export function Contact() {
  return (
    <main className="contact-page">
      <div>
        <p className="eyebrow">Contact AXION</p>
        <h1>Let’s build something better.</h1>
        <p>Questions about an order, sizing, products, or Builder Spotlight? Send us a message.</p>
      </div>
      <form name="contact" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
        <label>Name<input required name="name" /></label>
        <label>Email<input required type="email" name="email" /></label>
        <label>Order number <span>Optional</span><input name="order-number" /></label>
        <label>Message<textarea required name="message" rows={7} /></label>
        <button className="button primary">Send message</button>
      </form>
    </main>
  );
}

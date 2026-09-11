import './Description.css';

function Description({ activeNavInfoId, navigationInfo, setActiveNavInfoId }) {
	if (activeNavInfoId === null) {
		return null;
	}

	const activeInfo = navigationInfo.find((item) => item.id === activeNavInfoId);

	if (!activeInfo) {
		return null;
	}

	return (
		<section
			className="info-modal"
			role="dialog"
			aria-modal="true"
			aria-label="Navigation information"
			onClick={() => setActiveNavInfoId(null)}
		>
			<div className="info-content" onClick={(event) => event.stopPropagation()}>
				<button
					className="details-close"
					type="button"
					aria-label="Close information"
					onClick={() => setActiveNavInfoId(null)}
				>
					×
				</button>
				<p className="details-label">TASTY BURGER</p>
				<h2>{activeInfo.title}</h2>
				<p>{activeInfo.description}</p>
				{activeNavInfoId === 'contact' && (
					<div className="contact-details">
						<div className="contact-list">
							<a href="mailto:hello@tastyburger.com">tastyburger@gmail.com</a>
							<a href="tel:+15550142787">+63969696969</a>
							<span>Monday - Sunday, 11:00 AM - 10:00 PM</span>
						</div>
						<form className="contact-form" onSubmit={(event) => event.preventDefault()}>
							<label htmlFor="contact-name">Name</label>
							<input id="contact-name" name="name" type="text" required />
							<label htmlFor="contact-email">Email</label>
							<input id="contact-email" name="email" type="email" required />
							<label htmlFor="contact-message">Message</label>
							<textarea id="contact-message" name="message" rows={3} required />
							<button type="submit">SEND MESSAGE</button>
						</form>
					</div>
				)}
			</div>
		</section>
	);
}

export default Description;

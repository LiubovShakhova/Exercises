const myTeam = () => {
	const teamRow = document.querySelector('.command>.container>.row');

	const changePhoto = event => {
		const target = event.target;

		if (target.classList.contains("command__photo")) {
			const src = target.src;
			target.src = target.dataset.img;
			target.dataset.img = src;
		}
	};
	teamRow.addEventListener("mouseover", changePhoto);
	teamRow.addEventListener("mouseout", changePhoto);
};

export default  myTeam;
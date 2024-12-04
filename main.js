const loadItems = () => {
	const jsonUrl = "datos.json";
	const portfolioGrid = document.getElementById("portfolio-grid");

	if (!portfolioGrid) return;

	return fetch(jsonUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(project => {
				const projectDiv = document.createElement("div");
				projectDiv.className = `item ${project.category.toLowerCase()} col-sm-6 col-md-4 col-lg-4 mb-4`;
				projectDiv.innerHTML = `
					<a href="single.html?letra=${project.title}" class="item-wrap fancybox">
					<div class="work-info">
							<h3>${project.title}</h3>
							<span>${project.category}</span>
					</div>
					<img class="img-fluid" src="${project.image}" alt="${project.title}">
					</a>
				`;

				portfolioGrid.appendChild(projectDiv);
			});
		})
		.catch(error => console.error("Error al cargar los datos del JSON:", error));
};


(function ($) {
	"use strict";

	var siteIstotope = function () {
		var $container = $('#portfolio-grid').isotope({
			itemSelector: '.item',
			isFitWidth: true
		});

		$container.imagesLoaded().progress(function () {
			$container.isotope('layout');
		});

		$(window).resize(function () {
			$container.isotope({
				columnWidth: '.col-sm-3'
			});
		});

		$container.isotope({ filter: '*' });

		$('#filters').on('click', 'a', function (e) {
			e.preventDefault();
			var filterValue = $(this).attr('data-filter');
			$container.isotope({ filter: filterValue });
			$('#filters a').removeClass('active');
			$(this).addClass('active');
		});
	}
	$(window).on('load', function () {
		loadItems().then(() => {
			siteIstotope();
		});
	});

})(jQuery);


/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('#nav a, .scrolly').scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		});

})(jQuery);

let activeProjectId = null;
function openProjectModal(projectId) {
	activeProjectId = projectId;
	const currentLang = localStorage.getItem('websiteLang') || 'en';
	const contentTarget = document.getElementById("modalDynamicContent");
	const modalOverlay = document.getElementById("projectModalContainer");

	// Construimos la ruta dinámica. Ej: "projects/magefall-es.html"
	const fileUrl = `assets/projects/${projectId}-${currentLang}.html`;

	// Hacemos la petición asíncrona para traer el archivo
	fetch(fileUrl)
		.then(response => {
			if (!response.ok) {
				throw new Error(`No se pudo encontrar el archivo del proyecto: ${fileUrl}`);
			}
			return response.text(); // Convertimos la respuesta a texto plano (HTML)
		})
		.then(htmlContent => {
			// Inyectamos el HTML directamente dentro del contenedor del modal
			contentTarget.innerHTML = htmlContent;

			// Mostramos el modal y bloqueamos el scroll del fondo
			modalOverlay.style.display = "flex";
			document.body.classList.add("no-scroll");
		})
		.catch(error => {
			console.error("Error al cargar el modal del proyecto:", error);
			contentTarget.innerHTML = `<p style="color:red; text-align:center;">Error loading project description.</p>`;
		});
}

/**
 * Cierra el modal y limpia el contenedor.
 */
function closeProjectModal() {
	document.getElementById("projectModalContainer").style.display = "none";
	document.body.classList.remove("no-scroll");

	// Opcional: limpiamos el contenido para que no se vea el proyecto anterior la próxima vez antes de cargar
	document.getElementById("modalDynamicContent").innerHTML = "";
	activeProjectId = null;
}

function openImage(element) {
	const modal = document.getElementById("imageModal");
	const fullImg = document.getElementById("fullImage");
	fullImg.src = element.src; // Copia la imagen
	modal.style.display = "flex";
}

function closeImage() {
	document.getElementById("imageModal").style.display = "none";
}
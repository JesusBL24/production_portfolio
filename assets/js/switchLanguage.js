/**
 * Main function to handle the website's language switching.
 * It updates text content, video sources, active UI states, and persists the choice.
 * * @param {string} lang - The language code to apply (e.g., 'en', 'es').
 */
function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    const dictionary = translations[lang];

    if (!dictionary) return;

    // Update the document's language attribute for SEO and accessibility
    document.documentElement.lang = lang;

    // Iterate through all elements marked for translation
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');

        if (dictionary[key]) {
            // Using innerHTML to allow formatted text (bold, links, etc.)
            element.innerHTML = dictionary[key];
        }
    });

    // Handle Video Internationalization (iframes)
    if (dictionary.videos) {
        for (const id in dictionary.videos) {
            const iframe = document.getElementById(id);
            if (iframe) {
                iframe.src = dictionary.videos[id];
            }
        }
    }

    // Reset and update visual state of language buttons
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.classList.remove('active-lang');
    });

    // Persist user preference in local storage
    const activeBtn = document.getElementById(`lang-${lang}`);
    if (activeBtn) {
        activeBtn.classList.add('active-lang');
    }

    localStorage.setItem('websiteLang', lang);

    // Sync other UI components with the current language
    updateLanguageButtons(lang);

    localStorage.setItem('websiteLang', lang);
    updateLanguageButtons(lang);

    // NUEVO: Si hay un modal abierto, recárgalo en el nuevo idioma de inmediato
    if (activeProjectId) {
        openProjectModal(activeProjectId);
    }

}


/**
 * Synchronizes the active state of language buttons by parsing their onclick attributes.
 * @param {string} activeLangCode - The current active language code.
 */
function updateLanguageButtons(activeLangCode) {

    const allLinks = document.querySelectorAll('#nav ul.container li a');

    allLinks.forEach(button => {

        const onclickAttr = button.getAttribute('onclick');

        // Check if the link is specifically a language switcher button
        if (onclickAttr && onclickAttr.includes('setLanguage')) {

            const isButtonActive = onclickAttr.includes(`'${activeLangCode}'`);

            if (isButtonActive) {
                button.classList.add('active-lang');
            } else {
                button.classList.remove('active-lang');
            }
        }
    });
}

/**
 * Initialization on page load. Fetches saved language or defaults to English.
 */
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('websiteLang') || 'en';
    setLanguage(savedLang);
});

/**
 * Bridge function to open the gallery with localized project images.
 * @param {string} projectKey - The key representing the project in the translations object.
 */
function handleGalleryOpen(projectKey) {

    const lang = localStorage.getItem('websiteLang') || 'en';

    if (translations[lang] && translations[lang][projectKey]) {
        const images = translations[lang][projectKey];
        openGallery(images);
    } else {
        console.error(`No se encontraron imágenes para: ${lang} -> ${projectKey}`);
    }
}

// Lang dictionaries
const translations = {
    // ---- ESPAÑOL (ES) ----
    'es': {

        //NAV
        'nav_top': 'Inicio',
        'nav_about': 'Sobre mí',
        'nav_skills': 'Habilidades',
        'nav_experience': 'Experiencia',
        'nav_design_process': 'Diseño',
        'nav_contact': 'Contacto',

        //HOME
        "home_roles": 'Productor y Diseñador Técnico',
        "home_description": 'Usar motores para desarrollar prototipos, iterar sobre ellos y escalar sus sistemas es mi pasión; crear la mejor experiencia de juego es mi objetivo',
        "home_eslogan": '\'Forjando experiencias, ciclo a ciclo.\'',

        //ABOUT ME
        'aboutMe_title': 'Sobre mí',
        'aboutMe_p1': 'Nacido en 2003, mi interés por los videojuegos comenzó cuando cogí los mandos con tres años, lo que me ha permitido desarrollar durante años una comprensión intuitiva de <strong>los objetivos detrás de las decisiones de diseño y de las consecuencias de diferentes mecánicas</strong>. De niño, también pasaba largas tardes jugando con LEGO, imaginando historias y mundos que más tarde me inspiraron a empezar a escribir, programar y cultivar un fuerte interés por la narrativa y el arte.',
        'aboutMe_p2': 'Reciéntemente obtuve mi <strong>título de Grado en Diseño y Desarrollo de Videojuegos</strong> en la Universidad Rey Juan Carlos de Madrid. Durante estos años, estudié diseño de mecánicas y niveles, el pipeline de producción de videojuegos, dirección de equipos usando Scrum (Certificado) y programación en C#, C++, javascript y Unity Engine. Además, mi deseo de aprendizaje me llevó a estudiar diseño de forma independiente y a participar con compañeros en <strong>varias game jams</strong> como <strong>diseñador</strong> y <strong>storyteller</strong> (e incluso una vez como director de arte). Esta experiencia ha fortalecido significativamente mis habilidades de comunicación, trabajo en equipo, análisis y resolución de problemas.',
        'aboutMe_p3': 'En 2025 se lanzó mi primer proyecto multiplataforma, ‘El Coco’, en el cual colaboré con el equipo de Recotechnology S.L. como Game Designer y Productor mientras terminaba mi TFG. Mis responsabilidades incluyeron la gestión de los objetivos y tareas del equipo, además de actuar como Game Designer 360° con un fuerte enfoque en el diseño de contenido y progresión. Este año he participado en el bootcamp internacional <strong><a href="https://gamedesignskills.com/courses/mechanics-bootcamp-scale-depth-alexander-brazie/ ">‘Mastering Game Mechanics’</a></strong> de Game Design Skills para perfeccionar el diseño de mecánicas profesional y los flujos de trabajo colaborativos con otros diseñadores.',
        'aboutMe_p4': 'Esto es solo el comienzo; mi pasión por los videojuegos y mi deseo continuo de aprender me impulsan a buscar nuevos horizontes y una oportunidad profesional en la industria para seguir desarrollando mis habilidades.',

        'aboutMe_subjects':'Grado en Diseño y Desarrollo de videojuegos (2020-2025)',
        'aboutMe_subject1':'Analicé <strong>economías</strong> de juego y estudié <strong>principios</strong> y <strong>frameworks</strong> de <strong>diseño</strong>.',
        'aboutMe_subject2':'Diseñé el <strong>gameplay</strong> y <strong>equilibré</strong> mecánicas en varios juegos pequeños.',
        'aboutMe_subject3':'<strong>Lideré el desarrollo</strong> gestionando tareas y objetivos en game jams y proyectos académicos.',
        'aboutMe_subject4':'Desarrollé juegos utilizando marcos de trabajo <strong>iterativos</strong>.',
        'aboutMe_subject5':'Redacté <strong>guiones</strong> y <strong>documentación</strong> de worldbuilding siguiendo metodologías profesionales.',
        'aboutMe_subject6':'Implementé diversas funcionalidades en Unity utilizando <strong>patrones de diseño</strong>, incluyendo VR.',
        'aboutMe_subject7':'Apliqué <strong>matemáticas</strong> y <strong>física</strong> para el desarrollo de cálculos y sistemas de juego.',
        'aboutMe_subject8':'Aprendí a implementar <strong>IA</strong> mediante Máquinas de Estados, Árboles de Comportamiento y Sistemas de Utilidad.',
        'aboutMe_subject9':'Diseño de comportamientos',
        'aboutMe_subject10':'Diseño visual',
        'aboutMe_subject11':'Estadística y Análisis de datos',
        'aboutMe_subject12':'Certificado de Scrum Master',

        //BOOTCAMP:
        'aboutMe_bootcamp': 'Mastering Game Mechanics Bootcamp (2026)',
        'aboutMe_bootcamp1':'Aprendí herramientas, procesos y habilidades para diseñar de forma consistente <strong>mecánicas</strong> que logren un <strong>gameplay</strong> profundo, atractivo y escalable.',
        'aboutMe_bootcamp2':'Desarrollé un mejor <strong>pensamiento de diseño</strong> y una <strong>comunicación</strong> más clara y matizada.',
        'aboutMe_bootcamp3':'Adquirí una <strong>mejor comprensión</strong> de los procesos colaborativos entre el diseño de sistemas, el diseño de mecánicas y otras disciplinas.',
        'aboutMe_bootcamp4':'Potencié mis <strong>soft skills</strong>, incluyendo la discrepancia productiva y la resolución de conflictos.',
        'aboutMe_bootcamp5':'Mejoré mis <strong>habilidades iterativas</strong>: recopilación de feedback, análisis, resolución de problemas e implementación.',
        'aboutMe_bootcamp6':'Practiqué con <strong>equipos internacionales</strong> a través de diversos talleres.',

        //SKILLS
        'skills_title':'Habilidades',
        'skills_description':'A lo largo de mi trayectoria, he trabajado con diversas herramientas y he desarrollado mis habilidades para ser el mejor profesional posible.',
        'skills_some_experience':' = Poca experiencia',

        'skills_programmer':'Programación',
        'skills_unity':'Unity Engine / C#',
        'skills_c++':'C++ / CUDA',
        'skills_unreal':'Unreal 5 / BLUEPRINTS',
        'skills_html':'HTML / CSS',
        'skills_js':'JavaScript',
        'skills_patterns':'PATRONES DE DISEÑO',

        'skills_gameDesign':'Game Design',
        'skills_coop':'Co-op',
        'skills_gameplay':'Mechanics Design',
        'skills_designPvP':'PvP',
        'skills_enemy':'Enemy Design',
        'skills_iterative':'Iterative Design',
        'skills_documentation':'Word / Docs',
        'skills_excel':'Excel / Sheets',
        'skills_prototype':'Prototyping',
        'skills_playtest':'Playtesting',
        'skills_narrative':'Narrative Design',
        'skills_level':'Level Design',
        'skills_visual':'Visual Design',
        'skills_blender':'Blender',
        'skills_PvE':'PvE',
        'skills_3C':'3C\'s',

        'skills_producing':'Producción',
        'skills_communication':'Comunicación',
        'skills_agile':'Met. Ágiles',
        'skills_leadership':'Liderazgo',
        'skills_endToEnd':'Principio a fin',
        'skills_jira':'Jira',
        'skills_functional':'Multifuncional',

        //EXPERIENCE
        'experience_title':'Experiencia y proyectos',
        'experience_description':'Estos son mis proyectos profesionales y personales destacados que muestran mis habilidades en el desarrollo de videojuegos.',
        'experience_professional':'Proyectos profesionales',
        'project_available_on': '<strong>Disponible en:<strong>',
        'knowMore': 'One-pagers',
        'contribution':'Contribución',
        'word_and': 'y',

        'el_coco_description':'EL COCO es un juego roguelike de acción que te sumerge en un mundo de sueños, recuerdos rotos y pesadillas encarnadas. Desciende a Lo Incierto, un lugar tan extraño como peligroso, y lucha por recuperar lo que perdiste… si es que puedes confiar en quien te guía.',
        'el_coco_Genre':'<strong>Género:</strong> Rogue-lite de acción',
        'el_coco_Type': ' <strong>Tipo:</strong> Retos, Cámara picada',
        'el_coco_Team Size':'<strong>Tamaño del equipo:</strong> 10',
        'el_coco_Engine':'<strong>Motor:</strong> Unity (C#)',
        'el_coco_role': '<strong>Rol</strong>: Productor y diseñador',
        'el_coco_lead':'<strong>Gestión de Pipeline e Hitos</strong>: Coordiné equipos multidisciplinares para alcanzar un lanzamiento comercial multiplataforma en los plazos previstos, estableciendo un pipeline de producción iterativo y haciendo seguimiento riguroso de los hitos de entrega (milestones).',
        'el_coco_systems': '<strong>Control de Alcance (Scope) y Ciclo de Vida</strong>: Gestioné el ciclo de vida del desarrollo y los sprints de iteración de los sistemas principales, equilibrando la integración de nuevas características (power-ups, bucles de progresión) con los límites de alcance y las fechas límite del proyecto.',
        'el_coco_enemies': '<strong>QA y Priorización del Backlog</strong>: Supervisé el pipeline de contenido para más de 20 niveles, coordinando pruebas de usuario estructuradas y traduciendo el feedback de las pruebas en tareas priorizadas e accionables dentro del backlog para pulir el balance y la usabilidad.',
        'el_coco_narrative': '<strong>Los demás detalles del proyecto están sujetos a un acuerdo de confidencialidad (NDA).</strong>',
        'el_coco_platforms': 'Plataformas: Disponible en PS5, PS4, Xbox One, Xbox Series X|S, Nintendo Switch y Steam.',

        'bratz_description':'¡Domina la pasarela y súbete al escenario con el Bratz Pack! Personaliza estilos rompedores, baila al ritmo de canciones del Universo Bratz como \'So Good\' y viaja a ciudades icónicas. Supera a la malvada Burdine Maxwell y a las gemelas Tweevil en épicas batallas de moda, ya sea en solitario o con amigos.',
        'bratz_Genre':'<strong>Género:</strong> Ritmo, Diseño de moda',
        'bratz_Type': ' <strong>Tipo:</strong> Fácil, Para toda la familia',
        'bratz_Team Size':'<strong>Tamaño del equipo:</strong>8',
        'bratz_Engine':'<strong>Motor:</strong> Unity (C#)',
        'bratz_role': '<strong>Rol:</strong>Post-Launch Producer',
        'project_bratz_info1':'<strong>Producción Post-Lanzamiento</strong>: Gestioné la producción post-lanzamiento, los pipelines de actualización y la entrega de hitos para una IP internacional de gran escala en múltiples consolas y Steam.Producción Post-Lanzamiento: Gestioné la producción post-lanzamiento, los pipelines de actualización y la entrega de hitos para una IP internacional de gran escala en múltiples consolas y Steam.',
        'project_bratz_info2':'<strong>Gestión de Stakeholders</strong>: Lideré reuniones de seguimiento de producción y mantuve canales directos de comunicación con clientes externos, publishers y partes interesadas.',
        'project_bratz_updates':'<strong>Ejecución y Resolución de Bloqueos</strong>: Cumplí el 100% de los objetivos del proyecto en plazos estrictos mediante la gestión proactiva del backlog, la eliminación diaria de bloqueos técnicos/creativos y el testing de funcionalidades.',
        'project_bratz_nda': '<strong>Los demás detalles del proyecto están sujetos a un acuerdo de confidencialidad (NDA).</strong>',

        'experience_personal': 'Proyectos personales',

        'magefall_description': 'Magefall, concebido originalmente como mi tesis de grado, es mi proyecto actual donde aplico principios avanzados de diseño desarrollando un juego desde cero hasta un prototipo final utilizando frameworks profesionales. Además, estoy utilizando Unreal Engine 5 y Blueprints para profundizar en las funcionalidades del motor y mejorar mis habilidades técnicas.',

        'magefall_title': 'Magefall: Prototipo de juego de Acción-Aventura <br>(Proyecto Personal, Actualidad)',
        'project_magefall_1': '<strong>Diseñador de Gameplay y Técnico</strong>',
        'project_magefall_2': '<strong>Diseño de Sistemas Modulares</strong>: Desarrollé los sistemas principales de juego (hechizos, armamento y estructura de misiones), validando las decisiones de diseño mediante pruebas con el público objetivo y marcos de trabajo profesionales.',
        'project_magefall_3': '<strong>Investigación y Excelencia Académica</strong>: Realicé una investigación profunda sobre diseño iterativo y sistemas de juego —alabada con máximas calificaciones por el tribunal universitario— analizando flujos de trabajo de referentes de la industria.',
        'project_magefall_4': '<strong>Prototipado y Mitigación de Riesgos</strong>: Mitigué riesgos de producción y aceleré las iteraciones utilizando prototipado en papel para simplificar mecánicas complejas y descartar funcionalidades no viables en fases tempranas.',
        'project_magefall_5': '<strong>Proceso Iterativo y Documentación</strong>: Maximicé la eficiencia de cada ciclo de desarrollo mediante un proceso iterativo centrado en prototipado rápido, pruebas continuas, resolución de problemas y documentación estructurada (GDDs y One-Pagers).',
        'project_magefall_6': 'Llevé a cabo sesiones de playtesting para identificar y evaluar problemas y fortalezas.',
        'project_magefall_7': 'Redacté documentación clara y versátil, incluyendo un GDD, briefs de proyecto y one-pagers.',

        'VR_title': 'Spaceship Commander VR Simulator',
        'project_VR_1': '<strong>Desarrollador y Diseñador VR</strong>',
        'project_VR_2': '<strong>Prototipado VR y Lógica de Simulación</strong>\': Diseñé y programé un prototipo interactivo de simulación táctica en 3D para Realidad Virtual, implementando control de entidades en tiempo real, creación dinámica de escenarios y lógica de reconocimiento de gestos en Unity (C#).',
        'project_VR_3': '<strong>Frameworks XR y Usabilidad</strong>\': Utilicé el XR Interaction Toolkit para construir modelos de interacción intuitivos en VR, ejecutando pruebas de usabilidad para optimizar la comodidad del usuario, la tasa de refresco y el rendimiento computacional.',
        'project_VR_4': '<strong>Ejecución Autónoma y Pipeline VR</strong>\': Ejecuté el ciclo de vida completo del proyecto de forma individual desde el concepto hasta el prototipo funcional en VR, demostrando capacidad de autogestión y un conocimiento práctico del pipeline de desarrollo inmersivo.',

        'SCR3D_description':'Un nuevo hero shooter de naves espaciales en el que eliges a tu personaje, personalizas tus armas y luchas contra tus rivales para dominar la Arena. Cada partida es un encuentro al mejor de tres, donde subes de nivel tu nave para desbloquear potentes mejoras y habilidades especiales.',
        'SCR3D_1':'<strong> Diseñador PvP y narrativo.</strong>',
        'SCR3D_2':'Diseñe un sistema de combate online 1vs1 galardonado como el mejor gameplay mediante la inclusión de técnicas de expertos en PvP.',
        'SCR3D_3':'Conseguí incluir un pipeline dinámico de trabajo, consiguiendo todos nuestros objetivos mediante la inclusión de un modelo iterativo basado en prototipos, pruebas y escalado.',
        'SCR3D_4':'Agilicé cada iteración, ganando velocidad como equipo en el proceso mediante el prototipado de naves, escenario y elementos del entorno directamente funcionales en linea.',
        'SCR3D_5':'Conseguí valor de cada iteración liderando sesiones de playtesting para encontrar bugs, problemas de balance y mejorar cada nave.',
        'SCR3D_6':'Creé un universo expansivo listo para varias temporadas mediante trasfondos de personaje, facciones y el universo en general.',
        'SCR3D_7':'Desarrollé un trasfondo escalable de mundo  y las historias de origen de todos los personajes.',

        'RAC_description':'Jóvenes promesas de un futuro brillante tienen algo que contarte. Habla con ellos lo máximo posible para conocer su historia y desvelar todos sus secretos.',
        'RAC_1':'<strong>Artista Principal</strong>',
        'RAC_2':'Definí la identidad visual y el estilo artístico general del proyecto.',
        'RAC_3':'Diseñé e ilustré recursos gráficos y el arte de los escenarios.',
        'RAC_4':'Creé y pulí las animaciones del personaje principal.',
        'RAC_5':'Premiado y seleccionado para su exhibición en el <strong>Barcelona Indie Dev Day</strong>.',

        'project_inner_description':'Sumérgete en un mundo futurista de misterio donde todo parece un juego. Sin embargo, tus decisiones acabarán revelando la verdad sobre quién eres realmente.',
        'project_inner_1': '<strong>Diseñador de mecánicas y narrativo.</strong>',
        'project_inner_2': 'Lideré al equipo para conseguir un juego premiado y seleccionado para su exhibición en el Guerrilla Game Festival mediante el establecimiento de una visión clara y una experiencia de jugador definida.',
        'project_inner_3': 'Creé una narrativa enigmática elogiada por los jueces, redactando guiones narrativos diseñando y diseñando una progresión basada en la resolución de un gran misterio.',
        'project_inner_4': 'Mejoré la experiencia emocional del juego iterando con testers en minijuegos con giros extraños y macabros.',
        'project_inner_5': 'Manejé la experiencia del jugador mediante el diseño de un HUB central con un fuerte enfoque en la narrativa ambiental y triggers narrativos.',
        'project_inner_6': 'Diseñé el nivel central (HUB), integrando narrativa ambiental y triggers narrativos.',
        'project_inner_7': 'Premiado y seleccionado para su exhibición en el <strong>Guerrilla Game Festival</strong>.',

        'experience_other': 'Otros proyectos',
        'mini_p1_title':'Space Commander Simulator',
        'mini_p1_desc':'Diseñé y programé un prototipo de estrategia de naves espaciales en <strong>VR con reconocimiento de gestos</strong>.',

        'mini_p2_desc':'Redacté todos los <strong>diálogos</strong> y <strong>guiones narrativos</strong> para nuestro propio juego spin-off.',

        'mini_p3_desc':'Diseñé y desarrollé un prototipo de plataformas en 3D usando <strong>patrones de diseño software</strong> y <strong>blockouts</strong>.',

        'mini_p4_title':'Colonia alien',
        'mini_p4_desc':'Implementé una colonia de NPCs con sistemas de percepción e interacción utilizando <strong>state machines propios</strong>.',

        'design_process_title': 'Proceso de Diseño',
        'design_process_description': 'Mi filosofía de diseño se basa en un riguroso marco iterativo de 4 etapas, garantizando que cada mecánica sea validada, equilibrada y esté perfectamente alineada con la experiencia central del jugador.',

        'design_process_stage1_title': 'Etapa 1: Definir el problema',
        'design_process_stage1_description1': 'Ya sea para definir la experiencia principal del jugador, crear nuevas mecánicas y sistemas, o ajustar los existentes, el primer paso es <br> <strong>identificar el problema</strong> que necesitamos resolver en la iteración actual.',
        'design_process_stage1_description2': 'Durante las etapas iniciales de conceptualización, el objetivo principal es <strong>definir la experiencia principal</strong>. Esto implica identificar las mecánicas y sistemas que se alineen con una <strong>visión de diseño</strong>: una frase concisa que encapsule la experiencia que se desea transmitir al jugador. Una vez que el desarrollo ha comenzado, los objetivos de iteración evolucionan hacia la creación de contenido y el refinamiento de los sistemas mediante el ajuste y equilibrio de las funciones ya existentes.',

        'design_process_stage2_title':'Etapa 2: Hallar la solución',
        'design_process_stage2_description1':'Cada problema tiene múltiples soluciones, pero identificar la más efectiva requiere un <strong>análisis profundo</strong>, la <strong>exploración</strong> de diversos conceptos y mantener una <strong>visión global</strong> que equilibre las necesidades del juego con las limitaciones del desarrollo.',
        'design_process_stage2_description2':'Esta etapa se centra en la <strong>lluvia de ideas</strong> y el <strong>análisis</strong> mediante la <strong>identificación de riesgos</strong> y los <strong>5 Pilares del Diseño de Juegos</strong> (Claridad, Satisfacción, Respuesta, Motivación y Fantasía). Esto asegura que cada función mejore la experiencia del jugador y sea técnicamente viable. Al desarrollar nuevos sistemas, aprovecho los <strong>patrones de diseño</strong> establecidos, adaptándolos e innovando sobre ellos para satisfacer las necesidades específicas del proyecto.',
        'design_process_stage2_description3':'Una vez exploradas las opciones, selecciono una solución única o un híbrido de varias, analizándola de nuevo para validar el concepto final o cambiar hacia una alternativa que se ajuste mejor al estado actual del juego.',

        'design_process_stage3_title':'Etapa 3: Probar la solución',
        'design_process_stage3_description1':'La implementación de nuevas funciones y mecánicas comienza con la creación de un <strong>prototipo rápido</strong> para <strong>identificar fortalezas</strong> y <strong>debilidades</strong> lo antes posible.',
        'design_process_stage3_description2':'Para mantener una documentación sólida, primero redacto un <strong>one-pager</strong> que resume los objetivos y las especificaciones clave de la solución propuesta. Posteriormente, se crea un prototipo rápido utilizando prototipos de papel, Machinations o motores de juego con recursos básicos y scripts sencillos, de modo que puedan <strong>probarse</strong> y <strong>ajustarse fácilmente</strong>.',
        'design_process_stage3_description3':'Una vez que el prototipo está listo, se somete a <strong>playtesting</strong> con las personas adecuadas. Ya sea con el equipo interno o con testers externos, siempre se tiene en cuenta al <strong>público objetivo</strong> y se preparan de antemano estrategias de recopilación de datos para obtener conclusiones.',

        'design_process_stage4_title':'Etapa 4: Evaluación',
        'design_process_stage4_description1':'Tras recopilar todo el <strong>feedback necesario</strong>, se <strong>analiza la información</strong> para determinar si la solución debe integrarse en el juego, perfeccionarse mediante nuevas iteraciones o descartarse por completo. Independientemente del resultado, la evaluación se <strong>documenta meticulosamente</strong> y se utiliza para definir nuevos objetivos en los siguientes ciclos de desarrollo. Esto garantiza que <strong>cada prueba contribuya al crecimiento</strong>.',

        'design_process_stage5_title':'Repetir',
        'design_process_stage5_description1':'Al finalizar la iteración, las ideas habrán sido validadas y las funciones implementadas. Es el momento de reunir al equipo para perfeccionar el proceso de desarrollo, identificar nuevas necesidades y planificar estratégicamente las futuras funciones y las próximas iteraciones.',


        'contact_title': 'Contáctame',

        'copy_success':'Copiado',
        'copy_error': 'Error al copiar',

        //VIDEOS
        'videos':{
            'video_Coco':'https://www.youtube.com/embed/-PS4w2wODa0?si=vrvYJoYqCKpjT4C5',
            'video_Bratz':'https://www.youtube.com/embed/QC1Otakvbps?si=ydC9rhXK7vRLCETI'
        },

        'Coco_One_Pagers': [
            'images/Coco/es_Intro.jpg',
            'images/Coco/es_Combat System.jpg',
            'images/Coco/es_Level System.jpg',
            'images/Coco/es_Progression System.jpg',
            'images/Coco/es_Narrative System.jpg'
        ],

        'SCR_One_Pagers': [
            'images/SCR/es_Intro.jpg',
            'images/SCR/es_combat.jpg',
            'images/SCR/es_characters.jpg'
        ]

    },

    // ---- INGLÉS (EN) ----
    'en': {
        'nav_top': 'Top',
        'nav_about': 'About me',
        'nav_skills': 'Skills',
        'nav_experience': 'Experience',
        'nav_design_process': 'Design',
        'nav_contact': 'Contact me',

        //HOME
        "home_roles": 'Producer & Technical Designer',
        "home_description": 'Working in-engine to build prototypes, iterating over them, and scaling their systems is my passion; creating the best gameplay experience is my objective.',
        "home_eslogan": '\'Handcrafted Experiences, Loop by Loop\'',

        //ABOUT ME
        'aboutMe_title': 'About me',
        'aboutMe_p1': 'Born in 2003, my interest in video games started at the age of three, allowing me during all these years to develop an intuitive understanding of <strong>the objectives behind each design decision and the consequences of different mechanics</strong>. As a child, I also spent long evenings playing with LEGO, imagining stories and worlds that later inspired me to begin writing, programming, and cultivating a strong interest in storytelling and art.',
        'aboutMe_p2': 'I recently received my <strong>Bachelor\'s Degree in Game Design and Development</strong> from Rey Juan Carlos University in Madrid. During these years, I  studied mechanics and level design, the video game production pipeline, team management using Scrum (Certificate) and programming in C#, C++, javascript and Unity Engine. Furthermore, my desire for improvement led me to independently studying design and participating with colleagues in <strong>several game jams</strong> as a <strong>designer</strong> and <strong>storyteller</strong> (and even once as an art director). This experience has significantly strengthened my communication, team working, analysis, and problem-solving skills.',
        'aboutMe_p3': 'In 2025, my first multiplatform project, <strong>‘El Coco’</strong>, was released, where I collaborated with the Recotechnology S.L. team as a <strong>Game Designer</strong> and <strong>Producer</strong> while finishing my Bachelor\'s Thesis. My responsibilities included managing the team’s goals and tasks, and serving as a 360° Game Designer with a heavy focus on content and progression design. This year, I have enrolled in the international <strong><a href="https://gamedesignskills.com/courses/mechanics-bootcamp-scale-depth-alexander-brazie/ ">‘Mastering Game Mechanics’</a></strong> by Game Design Skills to master professional mechanics design and collaborative workflows with other designers. .',
        'aboutMe_p4': 'This is just the beginning; my passion for games and continuous desire to learn drive me to seek new horizons and pursue a role in the industry to further develop my skills.',

        'aboutMe_subjects':'Bachelor\'s Degree in Game Design and Development (2020-2025)',
        'aboutMe_subject1':'Analyzed game <strong>economies</strong> and studied <strong>design</strong> principles and frameworks.',
        'aboutMe_subject2':'Designed <strong>gameplay</strong> and <strong>balanced</strong> mechanics for several small-scale games.',
        'aboutMe_subject3':'Developed games using <strong>iterative frameworks</strong>.',
        'aboutMe_subject4':'Authored <strong>scripts</strong> and <strong>worldbuilding documentation</strong> for projects following professional frameworks.',
        'aboutMe_subject5':'<strong>Implemented</strong> various game features in Unity using <strong>design patterns</strong>, including VR integration.',
        'aboutMe_subject6':'Applied <strong>mathematics</strong> and <strong>physics</strong> to handle in-game calculations and systems.',
        'aboutMe_subject7':'Learned and implemented <strong>AI</strong> with State Machines, Behavior Trees, and Utility Systems.',
        'aboutMe_subject8':'<strong>Led development</strong> by managing tasks and objectives for game jams and academic assignments.',
        'aboutMe_subject9':'Behaviour Design',
        'aboutMe_subject10':'Visual design',
        'aboutMe_subject11':'Statistics & Data Analysis',
        'aboutMe_subject12':'Scrum Master certificate',

        //BOOTCAMP:
        'aboutMe_bootcamp': 'Mastering Game Mechanics Bootcamp (2026)',
        'aboutMe_bootcamp1':'Learned tools, processes, skills, and knowledge to consistently <strong>design mechanics</strong> that leads to deeper engaging gameplay at scale.',
        'aboutMe_bootcamp2':'Developed a clearer, sharper and more nuanced <strong>design thinking</strong> and <strong>communication</strong>.',
        'aboutMe_bootcamp3':'Acquired a better understanding of <strong>collaborative processes</strong> between systems and mechanics design and other disciplines.',
        'aboutMe_bootcamp4':'Enhanced <strong>soft skills</strong> including productive disagreement and conflict resolution.',
        'aboutMe_bootcamp5':'Improved <strong>iterative skills</strong>: Feedback gathering, analysis, problem-solving and implementation.',
        'aboutMe_bootcamp6':'Practiced with <strong>international teams</strong> in several workshops.<br>',

        //SKILLS
        'skills_title':'Skills',
        'skills_description':'Along my journey, I have worked with several tools and developed my skills to be the best possible professional.',
        'skills_some_experience':' = Some experience',

        'skills_programmer':'Development',
        'skills_unity':'Unity Engine / C#',
        'skills_c++':'C++ / CUDA',
        'skills_unreal':'UE 5 / BLUEPRINTS',
        'skills_html':'HTML / CSS',
        'skills_js':'JavaScript',
        'skills_patterns':'DESIGN PATTERNS',

        'skills_gameDesign':'Game Design',
        'skills_coop':'Co-op',
        'skills_gameplay':'Mechanics Design',
        'skills_designPvP':'PvP',
        'skills_enemy':'Enemy Design',
        'skills_iterative':'Iterative Design',
        'skills_documentation':'Docs / Word',
        'skills_excel':'Excel / Sheets',
        'skills_prototype':'Prototyping',
        'skills_playtest':'Playtesting',
        'skills_narrative':'Narrative Design',
        'skills_level':'Level Design',
        'skills_visual':'Visual Design',
        'skills_blender':'Blender',
        'skills_PvE':'PvE',
        'skills_3C':'3C\'s',

        'skills_producing':'Producing',
        'skills_communication':'Communication',
        'skills_agile':'Agile',
        'skills_leadership':'Leadership',
        'skills_endToEnd':'End-to-end',
        'skills_jira':'Jira',
        'skills_functional':'Cross-functional',

        //EXPERIENCE
        'experience_title':'Experience and projects',
        'experience_description':'These are my featured professional and personal projects that highlight my skills on game development.',
        'experience_professional':'Professional projects',
        'project_available_on': '<strong>Available on:</strong>',
        'knowMore': 'Design details',
        'contribution':'Contribution',
        'word_and': 'and',


        'el_coco_description': 'EL COCO is an action roguelike that plunges you into a world of dreams, broken memories, and living nightmares. Descend into The Uncertain, a place as strange as it is dangerous, and fight to recover what you’ve lost.',
        'el_coco_Genre':'<strong>Genre:</strong> Action Rogue-lite',
        'el_coco_Type': ' <strong>Type:</strong> Challenges, Top-Down',
        'el_coco_Team Size':'<strong>Team Size:</strong> 10',
        'el_coco_Engine':'<strong>Engine:</strong> Unity (C#)',
        'el_coco_role': '<strong>Role:</strong> Producer & Game Designer ',
        'el_coco_lead':'<strong>Pipeline & Milestone Delivery</strong>: Coordinated cross-functional teams toward a successful multiplatform commercial launch on schedule by establishing an iterative production pipeline and tracking milestone deliverables.',
        'el_coco_systems': '<strong>Scope & Sprint Management</strong>: Managed the development lifecycle and iteration sprints for core gameplay systems, balancing new feature integrations (power-ups, progression loops) with strict project scope and production deadlines.',
        'el_coco_enemies': '<strong>QA & Backlog Prioritization</strong>:Oversaw the content pipeline for 20+ levels, leading structured playtesting sessions and converting user feedback into actionable, prioritized backlog tasks to refine balance and clarity.',
        'el_coco_narrative': '<strong>Further details are subject to a Non-Disclosure Agreement (NDA).</strong>',
        'el_coco_platforms': 'Platforms: Available on PS5, PS4, Xbox One, Xbox Series X|S, Nintendo Switch, and Steam.',

        'bratz_description':'Rule the runway and take the stage with the Bratz Pack! Customize fierce fashions, groove to songs from the Bratz Universe like ‘So Good’, and jet off to iconic cities. <br>Outshine mean Burdine and the Tweevil Twins in epic fashion battles—solo or with friends.',
        'bratz_Genre':'<strong>Genre:</strong> Rhythm, Fashion design',
        'bratz_Type': ' <strong>Type:</strong> Easy, Family',
        'bratz_Team Size':'<strong>Team Size:</strong>8',
        'bratz_Engine':'<strong>Engine:</strong> Unity (C#)',
        'bratz_role': '<strong>Role:</strong> Post-Launch Producer',
        'project_bratz_info1':'<strong>Post-Launch Production</strong>: Managed post-launch production, update pipelines, and milestone delivery for a major international IP across multiple console platforms and Steam.',
        'project_bratz_info2':'<strong>Stakeholder Management</strong>: Led production meetings and established direct communication channels with external clients, publishers, and stakeholders.',
        'project_bratz_updates':'<strong>Task Execution & Blocker Removal</strong>: Achieved 100% of project objectives within strict deadlines by proactively managing task backlogs, removing daily technical/creative blockers, and conducting feature testing.',
        'project_bratz_nda': '<strong>Further details are subject to a Non-Disclosure Agreement (NDA).</strong>',

        'experience_personal': 'Personal projects',

        'magefall_description': 'Magefall is my current project—originally conceived as my bachelor’s thesis—where I apply advanced design principles by developing a game from scratch into an in-engine prototype using professional frameworks. Furthermore, I am using Unreal Engine 5 and Blueprints to deepen in engine feature and improve my technical design skills.',
        'magefall_title': 'Magefall: An Action-Adventure Game Prototype <br>(Personal Project, Ongoing)',
        'project_magefall_1': '<strong>Game & Technical Designer</strong>',
        'project_magefall_2': '<strong>Modular System Design</strong>: Developed core gameplay systems (spells, weaponry, mission structures), validating design choices through target audience playtesting and professional design frameworks.',
        'project_magefall_3': '<strong>Research & Academic Excellence</strong>: Conducted in-depth research into iterative design and advanced game systems—earning top honors from university faculty—by analyzing industry-leading production and design workflows.',
        'project_magefall_4': '<strong>Prototyping & Risk Mitigation</strong>: Mitigated production risk and accelerated iteration by leveraging paper prototyping to simplify complex mechanics and filter out non-viable features early in development.',
        'project_magefall_5': '<strong>Iterative Process & Documentation</strong>: Maximized cycle efficiency by driving an iterative process focused on rapid prototyping, continuous testing, problem-solving, and structured documentation (GDDs & One-Pagers).',


        'VR_title': 'Spaceship Commander VR Simulator',
        'project_VR_1': '<strong>VR Developer & Designer</strong>',
        'project_VR_2': '<strong>VR Prototyping & Core Logic</strong>: Designed and programmed an interactive 3D tactical simulation prototype in VR, implementing real-time entity controls, dynamic scenario creation, and gesture recognition logic in Unity (C#).',
        'project_VR_3': '<strong>XR Frameworks & Usability</strong>: Leveraged the XR Interaction Toolkit to establish intuitive VR interaction models, conducting targeted usability testing to optimize user comfort, refresh rates, and computational performance.',
        'project_VR_4': '<strong>Autonomous Execution & VR Pipeline</strong>: Executed the complete development lifecycle individually from concept to a fully functional VR prototype, demonstrating self-management, technical problem-solving, and a deep understanding of immersive pipelines.',


        'SCR3D_description':'A brand-new spaceship hero shooter where you choose your character, customize your weapons, and fight your rivals to dominate the Arena. Each game is a \'best-of-three\' match where you level up your ship to unlock powerful boosters and signature abilities.',
        'SCR3D_1':'<strong> PvP Game Designer & Narrative Designer.</strong',
        'SCR3D_2':'Designed an online 1v1 combat system that was awarded "Best Gameplay" by incorporating expert-level PvP techniques.',
        'SCR3D_3':'Established a dynamic workflow pipeline, achieving all project goals through an iterative model based on prototyping, testing, and scalability.',
        'SCR3D_4':'Streamlined each iteration, accelerating the development process by prototyping ships, environments, and level elements with immediate online functionality.',
        'SCR3D_5':'Maximized value from every iteration by leading playtesting sessions to identify bugs, resolve balancing issues, and refine each ship.',
        'SCR3D_6':'Created an expansive lore framework ready for seasonal updates, including detailed character backgrounds, factions, and overarching world-building.',
        'SCR3D_7':'Developed a scalable world setting and backstories for the entire character roster.',

        'RAC_description':'Bright young stars with a future to build have a story to tell. Engage with them as much as possible to uncover their pasts and unveil all their secrets.',
        'RAC_1':'<strong>Lead Artist</strong>',
        'RAC_2':'Defined the overall visual identity and art style of the project.',
        'RAC_3':'Designed and illustrated graphical assets and environment art.',
        'RAC_4':'Created and polished the animations for the main character.',
        'RAC_5': 'Recognized with an award and selected for exhibition at <strong>Barcelona Indie Dev Day</strong>.',

        'project_inner_description':'Delve into a futuristic world of mystery where everything feels like a game. However, your decisions will ultimately reveal the truth about who you really are.',
        'project_inner_1': '<strong>Game & Narrative Designer.</strong>',
        'project_inner_2': 'Led the team to create a game awarded and selected for exhibition at the Guerrilla Game Festival by stablishing a clear vision and target player experience.',
        'project_inner_3': 'Created an enigmatic narrative praised by judges by designing a player progression system based on solving a central mystery and authoring narrative scripts.',
        'project_inner_4': 'Enhanced player emotional appeal by iterating with testers on minigames featuring strange and macabre twists.',
        'project_inner_5': 'Managed player flow and pathing by designing a central hub with a heavy focus on environmental storytelling and narrative triggers.',
        'project_inner_6': 'Architected the central HUB level, focusing on environmental storytelling and narrative triggers.',
        'project_inner_7': 'Recognized with an award and selected for exhibition at the <strong>Guerrilla Game Festival</strong>.',

        'experience_other': 'Other projects',

        'mini_p1_title':'Space Commander Simulator',
        'mini_p1_desc':'Designed and programmed a <strong>VR</strong> starship strategy prototype featuring a <strong>gesture recognition system</strong>.',

        'mini_p2_desc':'Authored all <strong>in-game dialogue</strong> and <strong>narrative scripts</strong> for our fan-made <br> spin-off.',

        'mini_p3_desc':'Designed and developed a 3D platformer using <strong>software design patterns</strong> and <strong>blockouts</strong>.',

        'mini_p4_title':'Alien Colony',
        'mini_p4_desc':'Engineered a NPC colony featuring <strong>state machines</strong>, perception systems, and complex interaction.',

        'design_process_title': 'Design Process',
        'design_process_description': 'My design philosophy is built on a rigorous 4-stage iterative framework, ensuring that every mechanic is validated, balanced, and perfectly aligned with the core player experience.',

        'design_process_stage1_title': 'Stage 1: Define the problem',
        'design_process_stage1_description1': 'Whether it is defining the core player experience, creating new mechanics and systems, or tuning existing ones, the first step is <strong>identifying the problem</strong> we need to solve in the current iteration.',
        'design_process_stage1_description2': 'In the first stages of conceptualization, the objective should be <strong>defining the core experience</strong>. In this case, the problem could be stated as finding the right main mechanics and systems that match a <strong>single statement</strong>: a phrase that conveys the desired experience that the game should provide. Once development has started, iteration objectives range from creating new content and systems for the game to tuning and balancing various existing features.',

        'design_process_stage2_title':'Stage 2: Find the Solution',
        'design_process_stage2_description1':'Every problem has multiple solutions, but identifying the most effective one requires <strong>deep analysis</strong>, <strong>exploring</strong> diverse concepts, and maintaining a <strong>big-picture</strong> perspective of both the game’s vision and development constraints.',
        'design_process_stage2_description2':'This stage focuses on <strong>brainstorming</strong> and <strong>vetting</strong> ideas through <strong>risk identification</strong> and the <strong>5 Pillars of Game Design</strong> (Clarity, Satisfaction, Response, Motivation, and Fantasy). This ensures that every feature enhances the player experience and is technically feasible. When designing new systems, I leverage established <strong>design patterns</strong>—adapting and innovating upon them to meet the project\'s specific needs.',
        'design_process_stage2_description3':'Once a range of options has been explored, I select a single solution or a hybrid of several, re-analyzing it to validate the final concept or look for a more effective alternative that aligns with the current build.',

        'design_process_stage3_title':'Stage 3: Test the Solution',
        'design_process_stage3_description1':'Implementing new features and mechanics begins with <strong>rapid prototyping</strong> to identify <strong>strengths</strong> and <strong>weaknesses</strong> as early as possible.',
        'design_process_stage3_description2':'To ensure robust documentation, I first draft a <strong>one-pager</strong> summarizing the solution\'s objectives and key specifications. Subsequently, a prototype is created—using paper prototypes, Machinations, or game engines with placeholder assets and scripts—allowing for <strong>quick testing</strong> and <strong>iteration</strong>.',
        'design_process_stage3_description3':'Once the prototype is functional, it undergoes <strong>playtesting</strong> with the appropriate audience. Whether testing with the internal team or external participants, the <strong>target audience</strong> remains the priority, and data collection strategies are prepared in advance to extract insights.',

        'design_process_stage4_title':'Stage 4: Evaluation',
        'design_process_stage4_description1':'Once the <strong>necessary feedback</strong> is collected, the data is <strong>analyzed</strong> to determine if the solution should be integrated into the game, refined through further iterations, or discarded entirely. Regardless of the outcome, the evaluation is <strong>meticulously documented</strong> and used to define new objectives for future development cycles. This ensures that every test contributes to the <strong>project’s growth</strong>.',

        'design_process_stage5_title':'Repeat',
        'design_process_stage5_description1':'By the end of the iteration, ideas have been validated and features implemented. Now is the time to gather the team to refine the development process, identify emerging needs, and plan future features and upcoming iterations',

        'contact_title': 'Contact me', // Mantener igual si ya está en inglés

        //COPIA
        'copy_success':'Copied',
        'copy_error': 'Copy error',

        //VIDEOS
        'videos':{
            'video_Coco':'https://www.youtube.com/embed/w1VXgXGJoMo?si=kQGGENqdgGSA5-C-',
            'video_Bratz':'https://www.youtube.com/embed/FJ5CNNaP4vQ?si=z_2PNQoDxg_0qs07'
        },

        'Coco_One_Pagers': [
            'images/Coco/en_Intro.jpg',
            'images/Coco/en_Combat System.jpg',
            'images/Coco/en_Level System.jpg',
            'images/Coco/en_Progression System.jpg',
            'images/Coco/en_Narrative System.jpg'
        ],

        'SCR_One_Pagers': [
            'images/SCR/en_Intro.jpg',
            'images/SCR/en_combat.jpg',
            'images/SCR/en_characters.jpg'
        ]

    }
};
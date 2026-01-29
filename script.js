// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Set page title
document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Set texts from config
    // CORREZIONE: Usa il nome dal config senza forzare "my love"
    document.getElementById('valentineTitle').textContent = config.valentineName;
    
    // Set first question texts
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;
    
    // Set second question texts (Love Meter 1)
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn2').textContent = config.questions.second.nextBtn;
    
    // Set third question texts (Scarso e vecchio)
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;
    document.getElementById('secretAnswerBtn3').textContent = config.questions.third.secretAnswer;

    // Set fourth question texts (Love Meter 2)
    document.getElementById('question4Text').textContent = config.questions.fourth.text;
    document.getElementById('startText4').textContent = config.questions.fourth.startText;
    document.getElementById('nextBtn4').textContent = config.questions.fourth.nextBtn;

    // Set fifth question texts (Finale)
    document.getElementById('question5Text').textContent = config.questions.fifth.text;
    document.getElementById('yesBtn5').textContent = config.questions.fifth.yesBtn;
    document.getElementById('noBtn5').textContent = config.questions.fifth.noBtn;

    // Create initial floating elements (Cuori + Animali)
    createFloatingElements();

    // Setup music player
    setupMusicPlayer();
    
    // Setup Love Meters
    setupLoveMeter('loveMeter', 'loveValue', 'extraLove');
    setupLoveMeter('loveMeter4', 'loveValue4', null);
});

// Create floating hearts and animals
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    // Create hearts
    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // CORREZIONE: Supporto per "animals" (nel config li avevi chiamati così)
    const animalList = config.floatingEmojis.animals || config.floatingEmojis.bears;
    animalList.forEach(animal => {
        const div = document.createElement('div');
        div.className = 'bear'; // Mantiene la classe CSS originale
        div.innerHTML = animal;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${questionNumber}`).classList.remove('hidden');
    window.scrollTo(0,0);
}

function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Logica Love Meter Universale
function setupLoveMeter(meterId, valueId, extraId) {
    const meter = document.getElementById(meterId);
    const valDisplay = document.getElementById(valueId);
    const extra = extraId ? document.getElementById(extraId) : null;

    if(!meter) return;

    meter.addEventListener('input', () => {
        const value = parseInt(meter.value);
        valDisplay.textContent = value;
        
        if (value > 100 && extra) {
            extra.classList.remove('hidden');
            const overflowPercentage = (value - 100) / 9900;
            const extraWidth = overflowPercentage * window.innerWidth * 0.8;
            meter.style.width = `calc(100% + ${extraWidth}px)`;
            
            if (value >= 5000) {
                extra.textContent = config.loveMessages.extreme;
            } else if (value > 1000) {
                extra.textContent = config.loveMessages.high;
            } else {
                extra.textContent = config.loveMessages.normal;
            }
        } else {
            if(extra) extra.classList.add('hidden');
            meter.style.width = '100%';
        }
    });
}

function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    
    createHeartExplosion();
}

function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const emojis = config.floatingEmojis.hearts;
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.className = 'heart';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}

function setupMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    if (!config.music.enabled) {
        document.getElementById('musicControls').style.display = 'none';
        return;
    }

    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}

const IntroEl = document.querySelector('#intro');
const CurtainEl = document.querySelector('#curtain');
const LoginBoxEl = document.querySelector('#loginBox');
const EnvelopeScreen = document.querySelector('#envelope-screen');
const EnvelopeWrapper = document.querySelector('.envelope-wrapper');
const MagicStarsEl = document.querySelector('#magic-stars');
const MainEl = document.querySelector('#main');
const TextEl = document.querySelector('#text');
const LetterContainerEl = document.querySelector('.letter-container');
const SignatureEl = document.querySelector('#signature');
const EyeTop = document.querySelector('#eye-top');
const EyeBottom = document.querySelector('#eye-bottom');
const MusicEl = document.querySelector('#music');

const pinBoxes = document.querySelectorAll('.pin-box');

const message = `کم کم به لحظات ملکوتی به دنیا آمدن یک دلقک نزدیک میشیم👀

پسر کوچولو بغض یاکریم من اگر درست یادم باشه این سال دومی که تولدت رو حضور دارم،
ولی خب پارسال به دلیل تازه همکار بودن و یهویی اعلام کردنش اجازه‌ای برای تولد گرفتن نداشتم و امسالم هزاران کیلومتر ازت دورترم...

وجودت تو این دنیا خیلی قشنگه، امیدوارم و از صمیم قلبم برات آرزو میکنم دنیا کاری نکنه که قلب مهربونت خودخواه بشه یا برنجه از کسی و همیشه مهربون و مشتی بمونی🫶

خوشحالم که اومدی و بخشی از زندگی من تو این یکسال شدی و کلی برات آرزوهای قشنگ و رسیدن به خواسته‌هاتو دارم🥹

و بدون که بعضی آدم‌ها فقط میان که زندگی آدم رو روشن‌تر کنن، تو دقیقا یکی از همونا تو این یکسال بودی و هستی✨

امیدوارم امسال برات سالی باشه که خودت هم از دیدن خودت توش کیف کنی و از مسیری که می‌ری لذت ببری، و بدون که منم کنارت می‌مونم بخصوص تو روزهای سختش😇

تولدت خیلی خیلی مبارک باشه پسر اردیبهشتی 🥳`;

let i = 0;

window.onload = function () {
    setTimeout(() => {
        IntroEl.style.opacity = "0";
        setTimeout(() => { IntroEl.classList.add("d-none"); IntroEl.classList.remove("d-flex"); }, 1000);
    }, 3200);
};

// حرکت خودکار بین مربع‌های رمز
pinBoxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
            if (index < pinBoxes.length - 1) {
                pinBoxes[index + 1].focus();
            }
        }
    });
    
    box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value === '') {
            if (index > 0) {
                pinBoxes[index - 1].focus();
            }
        }
    });
});

// تایید هویت و عبور از صفحه قفل
function UnlockLetter() {
    let CodeValue = "";
    pinBoxes.forEach(box => CodeValue += box.value);
    
    if (CodeValue === "1107") { // رمز ورود
        EyeTop.classList.add('close');
        EyeBottom.classList.add('close');

        // پخش موزیک (که حالا از سیستم خودت خونده میشه)
        if(MusicEl) { 
            MusicEl.volume = 0.5; // تنظیم بلندی صدا
            MusicEl.play().catch(e => console.log("آهنگ پلی نشد")); 
        }

        setTimeout(() => {
            CurtainEl.classList.add("d-none");
            CurtainEl.classList.remove("d-flex");
            EnvelopeScreen.classList.remove("d-none");
            
            EyeTop.classList.remove('close');
            EyeBottom.classList.remove('close');
        }, 800);
    } else {
        LoginBoxEl.classList.add("shake");
        setTimeout(() => { LoginBoxEl.classList.remove("shake"); }, 400);
        
        pinBoxes.forEach(box => box.value = "");
        pinBoxes[0].focus();
    }
}

// باز کردن پاکت و پرتاب ستاره
function OpenEnvelope() {
    EnvelopeWrapper.classList.add('open');
    createMagicStars();
    
    setTimeout(() => {
        EnvelopeScreen.classList.add('d-none');
        EnvelopeScreen.classList.remove('d-flex');
        
        MainEl.classList.remove("d-none");
        TextEl.innerHTML = '<span class="cursor">&nbsp;</span>';
        
        setTimeout(TypeWriter, 600);
    }, 1800);
}

// ساخت ستاره‌های جادویی
function createMagicStars() {
    for(let j = 0; j < 30; j++) {
        let star = document.createElement('div');
        star.classList.add('star');
        
        let angle = Math.random() * Math.PI * 2;
        let distance = Math.random() * 150 + 50;
        let tx = Math.cos(angle) * distance;
        let ty = Math.sin(angle) * distance;
        
        star.style.setProperty('--tx', `${tx}px`);
        star.style.setProperty('--ty', `${ty}px`);
        star.style.animation = `shootStar ${Math.random() * 0.8 + 0.5}s ease-out forwards`;
        
        MagicStarsEl.appendChild(star);
        setTimeout(() => { star.remove(); }, 1500);
    }
}

// ماشین تحریر نامه
function TypeWriter() {
    if (i < message.length) {
        let currentChar = message.charAt(i);
        let formattedChar = (currentChar === '\n') ? '<br>' : currentChar;
        
        TextEl.innerHTML = TextEl.innerHTML.replace('<span class="cursor">&nbsp;</span>', '') + formattedChar + '<span class="cursor">&nbsp;</span>';
        
        i++;
        LetterContainerEl.scrollTop = LetterContainerEl.scrollHeight;
        setTimeout(TypeWriter, 40);
    } else {
        TextEl.innerHTML = TextEl.innerHTML.replace('<span class="cursor">&nbsp;</span>', '');
        setDynamicDate();
        SignatureEl.classList.remove("d-none");
    }
}

// تنظیم تاریخ و ساعت زنده و خودکار
function setDynamicDate() {
    const now = new Date();
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
    const persianDate = new Intl.DateTimeFormat('fa-IR', dateOptions).format(now);
    const persianTime = new Intl.DateTimeFormat('fa-IR', timeOptions).format(now);
    
    const dateTextEl = document.querySelector('.date-text');
    dateTextEl.innerHTML = `به تاریخ: ${persianDate} | ساعت: ${persianTime}`;
}
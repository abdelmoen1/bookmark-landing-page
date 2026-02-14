/* =========================
   Mobile Menu Logic
========================= */

// عناصر الهيدر الأساسية
const humburger = document.querySelector("header nav span");
const menu = document.querySelector("header nav ul");
const headerContainer = document.querySelector(".header-container");

/*
وظيفة toggleMenu:
- تفتح وتسكر قائمة الموبايل
- تغيّر شكل الهيدر
- تبدّل أيقونة الهامبرغر ↔ إغلاق
*/
function toggleMenu() {

    // إظهار / إخفاء القائمة
    menu.classList.toggle("open-menu");

    // إضافة خلفية للهيدر (ما بتتكرر لو موجودة)
    headerContainer.classList.add("header");

    // تغيير أيقونة الزر حسب حالة القائمة
    const isClosed = humburger.classList.toggle("close");
    humburger.querySelector("img").src =
        isClosed ? "images/icon-close.svg" : "images/icon-hamburger.svg";
}

// تشغيل القائمة عند الضغط
humburger.addEventListener("click", toggleMenu);


/* =========================
   Scroll Behavior
========================= */

/*
التحكم بشكل الهيدر أثناء السكروول:
- إذا نزل المستخدم أكثر من 60px → يثبت الهيدر بخلفية
- إذا القائمة مفتوحة نحافظ على شكل الهيدر
- غير ذلك يرجع شكله الطبيعي
*/
window.addEventListener("scroll", () => {

    if (scrollY > 60) {
        headerContainer.classList.add("header");
        menu.classList.add("scroll-menu");
    }
    else if (menu.classList.contains("open-menu")) {
        headerContainer.classList.add("header");
    }
    else {
        headerContainer.classList.remove("header");
        menu.classList.remove("scroll-menu");
    }
});


/* =========================
   Tabs Section
========================= */

const tabsLis = document.querySelectorAll(".tabs ul li");
const tabsContent = document.querySelectorAll(".tabs-content .one-tab");

/*
Event Delegation:
- نستمع للنقر على ul
- نحدد أي li تم الضغط عليه
- نفعّل التاب ونخفي الباقي
*/
document.querySelector(".tabs ul").addEventListener("click", (e) => {

    const li = e.target.closest("li");
    if (!li) return; // حماية من الضغط خارج li

    // إزالة active من الجميع
    tabsLis.forEach(tab => tab.classList.remove("active"));

    // تفعيل التاب الحالي
    li.classList.add("active");

    // عرض المحتوى المرتبط بالـ data-name
    const dataName = li.dataset.name;

    tabsContent.forEach(tab =>
        tab.classList.toggle("hidden", tab.id !== dataName)
    );
});


/* =========================
   FAQ Section
========================= */

const asksLis = document.querySelectorAll(".asks-menu li");
const asksContent = document.querySelectorAll(".asks-content");
const allImages = document.querySelectorAll(".asks-menu li img");

/*
تدوير السهم:
- إعادة كل الأسهم للوضع الطبيعي
- تدوير سهم السؤال الحالي فقط
*/
function rotateImg(li) {

    allImages.forEach(img => {
        img.classList.remove("img-rotat");
        img.classList.add("img-back");
    });

    const img = li.querySelector("img");
    if (img) {
        img.classList.add("img-rotat");
        img.classList.remove("img-back");
    }
}

/*
تفعيل السؤال:
- إزالة active من الكل
- تفعيل الحالي
- تدوير السهم
- إرجاع id الإجابة المرتبطة فيه
*/
function setActive(li) {

    asksLis.forEach(item => item.classList.remove("active-ask"));
    li.classList.add("active-ask");

    rotateImg(li);

    return li.dataset.answer;
}

/*
إظهار الإجابة المناسبة وإخفاء الباقي
*/
function showAnswer(answerId) {

    asksContent.forEach(ans =>
        ans.classList.toggle("hidden", ans.id !== answerId)
    );
}

// Event Delegation للأسئلة
document.querySelector(".asks-menu").addEventListener("click", (e) => {

    const li = e.target.closest("li");
    if (!li) return; // حماية

    const answerId = setActive(li);
    showAnswer(answerId);
});


/* =========================
   Email Validation
========================= */

const emailInput = document.querySelector("form input[type='email']");
const spanError = document.querySelector("form span");
const errorIcon = document.querySelector("form img");
const form = document.querySelector("form");

/*
إظهار رسالة الخطأ:
- إضافة كلاس error
- التحكم بالتصميم من CSS فقط
*/
function showErrorMsg() {
    spanError.classList.add("error");
    emailInput.classList.add("error");
    errorIcon.classList.add("error");
    form.classList.add("form-error");
}

function hideErrorMsg() {
    spanError.classList.remove("error");
    emailInput.classList.remove("error");
    errorIcon.classList.remove("error");
    form.classList.remove("form-error");
}

/*
التحقق من الإيميل:
- منع الإرسال الافتراضي
- تنظيف القيمة
- اختبارها باستخدام Regex
*/
form.addEventListener("submit", (e) => {

    e.preventDefault();

    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!value || !emailRegex.test(value)) {
        showErrorMsg();
        return;
    }

    hideErrorMsg();
});

// إخفاء الخطأ مباشرة عند الكتابة
emailInput.addEventListener("input", hideErrorMsg);

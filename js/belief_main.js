document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 第一幕：仙迹传说
    // ==========================================
    let tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-belief-1 #belief-part-1",
            start: "top top", end: "+=2200", scrub: 1.2, pin: true,     
        }
    });

    tl1.to("#section-belief-1 .center-text", { opacity: 0, y: -60, duration: 2, ease: "power1.inOut" }, 0)
       .to("#section-belief-1 .scene-group", { opacity: 1, duration: 2 }, 0)
       .to("#section-belief-1 .mark", { opacity: 0.9, duration: 2, stagger: 0.4, ease: "power2.inOut" }, 0.5)
       .to("#section-belief-1 .hotspots-container", { autoAlpha: 1, duration: 1.5 }, 1.5)
       .to({}, { duration: 1 }); 

    const buttons1 = document.querySelectorAll("#section-belief-1 .hotspot-btn");
    buttons1.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            const targetName = btn.getAttribute("data-target");
            const panel = document.querySelector(`#section-belief-1 #panel-${targetName}`);
            if (panel) panel.classList.add("show-panel");
        });
        btn.addEventListener("mouseleave", () => {
            const targetName = btn.getAttribute("data-target");
            const panel = document.querySelector(`#section-belief-1 #panel-${targetName}`);
            if (panel) panel.classList.remove("show-panel");
        });
    });

    // ==========================================
    // 第二幕：瑞兽护桥
    // ==========================================
    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-belief-2 #belief-part-2",
            start: "top top", end: "+=4500", scrub: 1.2, pin: true,     
        }
    });

    const BeastActiveFilter = `drop-shadow(0.8px 0.8px 0px #d4af37) drop-shadow(-0.8px -0.8px 0px #d4af37) drop-shadow(-0.8px 0.8px 0px #d4af37) drop-shadow(0.8px -0.8px 0px #d4af37) drop-shadow(0px 0px 8px rgba(255, 215, 0, 0.6))`;
    const BeastNormalFilter = "drop-shadow(0px 0px 0px transparent)";

    tl2.to("#section-belief-2 #title-beast", { left: "25%", scale: 0.7, top: "12%", duration: 2, ease: "power2.inOut" }, 1)
       .to("#section-belief-2 .left-beasts", { left: "25%", scale: 0.8, duration: 2, ease: "power2.inOut" }, 1)
       .to("#section-belief-2 .right-content", { autoAlpha: 1, duration: 2 }, 1)
       .to("#section-belief-2 #nav-lion img", { scale: 1.12, filter: BeastActiveFilter, duration: 1 }, 2)
       .fromTo("#section-belief-2 #panel-lion", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1 }, 2)
       .fromTo("#section-belief-2 #panel-lion .real-img", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, 2.4)
       .to({}, {duration: 1.2}); 

    function transitionStep(outId, inId) {
        tl2.to(`#section-belief-2 #panel-${outId}`, { autoAlpha: 0, y: -30, duration: 1 })
           .to(`#section-belief-2 #nav-${outId} img`, { scale: 1, filter: BeastNormalFilter, duration: 1 }, "<")
           .fromTo(`#section-belief-2 #panel-${inId}`, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1 }, "<")
           .fromTo(`#section-belief-2 #panel-${inId} .real-img`, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, "<+0.4")
           .to(`#section-belief-2 #nav-${inId} img`, { scale: 1.12, filter: BeastActiveFilter, duration: 1 }, "<")
           .to({}, {duration: 1.2}); 
    }
    transitionStep("lion", "dragon");
    transitionStep("dragon", "qilin");
    transitionStep("qilin", "elephant");
    tl2.to({}, { duration: 1.5 }); 

    // ==========================================
    // 第三幕：构造与信仰 (核心修正：删除了多余分号)
    // ==========================================
    let tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-belief-3 #belief-part-3",
            start: "top top", end: "+=2000", scrub: 1, pin: true,     
        }
    });

    tl3.from("#section-belief-3 .bg-img", { opacity: 0, duration: 1 }, 0)
       .from("#section-belief-3 .right-bridge", { x: "30vw", opacity: 0, duration: 1.5, ease: "power2.out" }, 0.5)
       .from("#section-belief-3 .left-panel", { x: "-50px", opacity: 0, duration: 1.5, ease: "power2.out" }, 1)
       .to("#quiz-trigger", { autoAlpha: 1, duration: 1, y: -20 }, "+=0.5"); // ✨ 这里现在正常连接，不再报错

    const circles = document.querySelectorAll("#section-belief-3 .circle-item");
    const texts = document.querySelectorAll("#section-belief-3 .info-text");
    const overlays = document.querySelectorAll("#section-belief-3 .bridge-overlay");
    const defaultText = document.querySelector("#section-belief-3 #info-default");

    circles.forEach(circle => {
        circle.addEventListener("mouseenter", () => {
            const target = circle.getAttribute("data-target"); 
            texts.forEach(t => t.classList.remove("active"));
            const targetText = document.querySelector(`#section-belief-3 #info-${target}`);
            if(targetText) targetText.classList.add("active");
            overlays.forEach(img => img.classList.remove("active"));
            const targetOverlay = document.querySelector(`#section-belief-3 #overlay-${target}`);
            if(targetOverlay) targetOverlay.classList.add("active");
        });
        circle.addEventListener("mouseleave", () => {
            texts.forEach(t => t.classList.remove("active"));
            defaultText.classList.add("active");
            overlays.forEach(img => img.classList.remove("active"));
        });
    });

    // ==========================================
    // 🌟 答题系统逻辑 (民俗与信仰题库)
    // ==========================================
    const quizData = [
        {
            question: "古桥桥面的驴蹄印、车沟等痕迹，源于什么信仰？",
            options: ["神仙护桥", "祖先崇拜", "自然图腾"],
            answer: 0, 
            explanation: "解析：痕迹传为神仙留下，象征神灵庇佑，实现“以神护桥”。"
        },
        {
            question: "古代桥梁最常见的镇桥瑞兽是？",
            options: ["石狮", "凤凰", "鹿"],
            answer: 0,
            explanation: "解析：石狮是古桥最普遍的瑞兽雕刻，用于镇桥辟邪、护佑平安。"
        },
        {
            question: "古桥多用奇数桥洞，主要因为奇数被视为？",
            options: ["阳数，吉祥", "方便施工", "节省材料"],
            answer: 0,
            explanation: "解析：传统文化中奇数为阳数，寓意吉祥，故桥洞多设计为奇数。"
        }
    ];

    let currentQ = 0;
    let selectedOption = null;

    const modal = document.getElementById("quiz-modal");
    const triggerBtn = document.getElementById("quiz-trigger");
    const closeBtn = document.getElementById("quiz-close");
    const qText = document.getElementById("q-text");
    const qOptions = document.getElementById("q-options");
    const qSubmit = document.getElementById("q-submit");
    const qFeedback = document.getElementById("q-feedback");

    triggerBtn.addEventListener("click", () => {
        modal.classList.add("show");
        loadQuestion(currentQ);
    });
    closeBtn.addEventListener("click", () => modal.classList.remove("show"));

    function loadQuestion(index) {
        selectedOption = null;
        qSubmit.disabled = true;
        qSubmit.innerText = "提交作答";
        qFeedback.className = "quiz-feedback"; 
        const data = quizData[index];
        qText.innerText = `${index + 1}/3. ${data.question}`;
        qOptions.innerHTML = "";
        data.options.forEach((opt, i) => {
            const div = document.createElement("div");
            div.className = "quiz-option";
            div.innerText = String.fromCharCode(65 + i) + ". " + opt; 
            div.addEventListener("click", () => selectOption(div, i));
            qOptions.appendChild(div);
        });
    }

    function selectOption(element, index) {
        if (qSubmit.innerText === "下一题" || qSubmit.innerText === "完成测验") return;
        document.querySelectorAll(".quiz-option").forEach(el => el.classList.remove("selected"));
        element.classList.add("selected");
        selectedOption = index;
        qSubmit.disabled = false;
    }

    qSubmit.addEventListener("click", () => {
        const data = quizData[currentQ];
        const optionsEl = document.querySelectorAll(".quiz-option");
        if (qSubmit.innerText === "提交作答") {
            if (selectedOption === data.answer) {
                optionsEl[selectedOption].classList.add("correct");
                qFeedback.innerText = "回答正确！" + data.explanation;
                qFeedback.classList.add("show", "success");
            } else {
                optionsEl[selectedOption].classList.add("wrong");
                optionsEl[data.answer].classList.add("correct");
                qFeedback.innerText = "回答错误。" + data.explanation;
                qFeedback.classList.add("show", "error");
            }
            if (currentQ < quizData.length - 1) {
                qSubmit.innerText = "下一题";
            } else {
                qSubmit.innerText = "完成测验";
            }
        } 
        else if (qSubmit.innerText === "下一题") {
            currentQ++;
            loadQuestion(currentQ);
        } 
        else if (qSubmit.innerText === "完成测验") {
            modal.classList.remove("show");
            currentQ = 0; 
        }
    });

    // ===== 音乐控制逻辑 =====
    // ==========================================
    // 🎵 全局音乐控制逻辑 (带跨页面状态记忆)
    // ==========================================
    const musicToggle = document.getElementById("music-toggle");
    const bgMusic = document.getElementById("bg-music");

    if (musicToggle && bgMusic) {
        // 为了防止背景音太吵，我们将音量默认设为 40% (0.4)
        bgMusic.volume = 0.4; 

        // 1. 读取浏览器记忆，看看用户在上一页是否开启了音乐
        let isMusicPlaying = localStorage.getItem("bgMusicPlaying") === "true";
        
        // 2. 尝试跨页面自动续播
        if (isMusicPlaying) {
            bgMusic.play().then(() => {
                musicToggle.classList.remove("paused");
            }).catch(() => {
                // 如果浏览器强行拦截了自动播放，就退回暂停状态
                musicToggle.classList.add("paused");
                localStorage.setItem("bgMusicPlaying", "false");
            });
        } else {
            musicToggle.classList.add("paused");
        }

        // 3. 点击按钮的开关逻辑
        musicToggle.addEventListener("click", () => {
            if (bgMusic.paused) { 
                bgMusic.play(); 
                musicToggle.classList.remove("paused"); 
                localStorage.setItem("bgMusicPlaying", "true"); // 记住开启状态
            } else { 
                bgMusic.pause(); 
                musicToggle.classList.add("paused"); 
                localStorage.setItem("bgMusicPlaying", "false"); // 记住关闭状态
            }
        });
    }
});
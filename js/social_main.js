document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set("#section-social-1 .info-panel", { x: "100%" });

    // ==========================================
    // 第一幕：折柳寄情
    // ==========================================
    let tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-social-1 .stage-1-container",
            start: "top top",
            end: "+=2500", 
            scrub: 1,
            pin: true,
        }
    });

    tl1.to("#section-social-1 .bridge-img", { opacity: 0.25, duration: 2, ease: "power1.inOut" }, 0)
       .to("#section-social-1 .intro-text", { opacity: 0, y: 30, duration: 1.5, ease: "power1.inOut" }, 0)
       .to("#section-social-1 .info-panel", { x: "0%", duration: 2, ease: "power2.out" }, 0)
       .to({}, { duration: 1 })
       // 离场时画面淡出，留出纯白宣纸背景
       .to("#section-social-1 .stage-1-container", { opacity: 0, duration: 1.5 }); 


    // ==========================================
    // 第二幕：廊桥社交
    // ==========================================
    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-social-2 .stage-container",
            start: "top top",
            end: "+=6000", 
            scrub: 1.5,
            pin: true,
        }
    });

    tl2.from("#section-social-2 .bridge-bg", { scale: 1.25, duration: 2, ease: "power2.out" })
       .from("#section-social-2 .hotspot-main", { opacity: 0, scale: 0, duration: 1 }, "-=1")
       .to({}, { duration: 1.5 })
       .to("#section-social-2 .group-women", { opacity: 1, duration: 1.5 })
       .to({}, { duration: 1 })
       .to("#section-social-2 .group-storyteller", { opacity: 1, duration: 1.5 })
       .to({}, { duration: 1 })
       .to("#section-social-2 .group-council", { opacity: 1, duration: 1.5 })
       .to({}, { duration: 2 })
       // 离场时画面淡出，为接下来的“渐变黑暗空间”做好准备
       .to("#section-social-2 .stage-container", { opacity: 0, duration: 1.5 }); 


    // ==========================================
    // 第三幕：走百病与灯谜
    // ==========================================
    let tl3 = gsap.timeline({
        scrollTrigger: {
            // ✨ 核心机制：确保动画只在划过渐变段，真正到达 stage-container 时才开始！
            trigger: "#section-social-3 #social-part-3",
            start: "top top",
            end: "+=2000",
            scrub: 1.5,
            pin: true,
        }
    });

    // 第三幕本身的入场动画（这时候用户已经滑过了从白到黑的渐变段，画面完全变黑了）
    tl3.from("#section-social-3 .night-sky-img", { scale: 1.15, opacity: 0, duration: 2, ease: "power1.inOut" })
       .from("#section-social-3 .bridge-img", { y: "20%", opacity: 0, duration: 2, ease: "power2.out" }, "-=1.5")
       .from("#section-social-3 .lantern-group", { opacity: 0, y: -60, duration: 2, ease: "back.out(1.2)" }, "-=1")
       .to("#quiz-trigger", { autoAlpha: 1, duration: 1, y: -20 }, "+=0.5");

    // ==========================================
    // 灯笼交互状态机
    // ==========================================
    const container = document.querySelector("#section-social-3 #social-part-3");
    const trigger1 = document.querySelector("#section-social-3 #trigger-1");
    const trigger2 = document.querySelector("#section-social-3 #trigger-2");
    const trigger3 = document.querySelector("#section-social-3 #trigger-3");

    function clearAllStates() {
        container.classList.remove("active-1", "active-2", "active-3");
    }

    if(trigger1 && trigger2 && trigger3) {
        trigger1.addEventListener("mouseenter", () => { clearAllStates(); container.classList.add("active-1"); });
        trigger1.addEventListener("mouseleave", clearAllStates);

        trigger2.addEventListener("mouseenter", () => { clearAllStates(); container.classList.add("active-2"); });
        trigger2.addEventListener("mouseleave", clearAllStates);

        trigger3.addEventListener("mouseenter", () => { clearAllStates(); container.classList.add("active-3"); });
        trigger3.addEventListener("mouseleave", clearAllStates);
    }
    // ==========================================
    // 🌟 答题系统逻辑 (社交与生活题库)
    // ==========================================
    const quizData = [
        {
            question: "灞桥成为文化名桥，与哪种桥上习俗密切相关？",
            options: ["夜间捕鱼", "桥上比武", "折柳送别"],
            answer: 2, // 对应 C (索引从0开始)
            explanation: "解析：灞桥是古代折柳送别发源地，承载离别文化内涵。"
        },
        {
            question: "廊桥最突出的结构特点是桥上建有？",
            options: ["廊道亭榭", "金属栏杆", "石质桥墩"],
            answer: 0, // 对应 A
            explanation: "解析：廊桥带有廊道、亭榭，可遮风避雨，供人休憩社交。"
        },
        {
            question: "“走百病”“猜灯谜”让桥梁成为什么场所？",
            options: ["军事要塞", "公共社交与节庆空间", "仓储库房"],
            answer: 1, // 对应 B
            explanation: "解析：节庆活动使桥梁成为民众欢聚、祈福娱乐的公共空间。"
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

    if (triggerBtn && modal) {
        triggerBtn.addEventListener("click", () => {
            modal.classList.add("show");
            loadQuestion(currentQ);
        });
        closeBtn.addEventListener("click", () => modal.classList.remove("show"));
    }

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

    if (qSubmit) {
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
    }
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
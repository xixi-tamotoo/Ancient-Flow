document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 第一幕：水陆枢纽与商品 (#section-trade-1)
    // ==========================================
    let tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-trade-1 #trade-part-1",
            start: "top top",
            end: "+=3500",
            scrub: 1,      
            pin: true,     
        }
    });

    tl1.to("#section-trade-1 .full-bridge", { opacity: 1, duration: 2 }, 0)
       .to("#section-trade-1 .text-1", { opacity: 0, y: -30, duration: 1 }, 0)
       .fromTo("#section-trade-1 .text-2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 1)
       .to("#section-trade-1 .text-2", { opacity: 0, y: -30, duration: 1 }, 3)
       .to("#section-trade-1 .dark-bridge", { opacity: 1, duration: 2 }, 3)
       .to("#section-trade-1 .hotspots-container", { autoAlpha: 1, duration: 1 }, 4)
       // ✨ 结尾淡出：为第二幕的过渡留出干净底色
       .to({}, { duration: 1 })
       .to("#section-trade-1 .stage-container", { opacity: 0, duration: 1.5 });

    // 热点悬停逻辑
    const buttons = document.querySelectorAll("#section-trade-1 .hotspot-btn");
    buttons.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            const targetName = btn.getAttribute("data-target"); 
            document.querySelector(`#section-trade-1 .hl-${targetName}`).classList.add("show-hl");
            document.querySelector(`#section-trade-1 .text-${targetName}`).classList.add("show-text");
        });
        btn.addEventListener("mouseleave", () => {
            const targetName = btn.getAttribute("data-target");
            document.querySelector(`#section-trade-1 .hl-${targetName}`).classList.remove("show-hl");
            document.querySelector(`#section-trade-1 .text-${targetName}`).classList.remove("show-text");
        });
    });

    // ==========================================
    // 第二幕：四大桥市 (#section-trade-2)
    // ==========================================
    
    // ✨ 滚动消模糊系统 (与上一部分物理叠加)
    gsap.fromTo("#section-trade-2 .bg-red",
        { opacity: 0, filter: "blur(20px)" },
        {
            opacity: 1, filter: "blur(0px)",
            scrollTrigger: {
                trigger: "#section-trade-2",
                start: "top 80%", 
                end: "top 20%",   
                scrub: true
            }
        }
    );

    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-trade-2 #trade-part-2",
            start: "top top",
            end: "+=2000",
            scrub: 1,      
            pin: true,     
        }
    });

    tl2.from("#section-trade-2 .cloud-left", { x: "-50vw", opacity: 0, duration: 2 }, 0)
       .from("#section-trade-2 .cloud-right", { x: "50vw", opacity: 0, duration: 2 }, 0)
       .to("#section-trade-2 .bridge-circle", { opacity: 1, scale: 1, duration: 1.5, stagger: 0.3, ease: "back.out(1.5)" }, 1.5)
       .to("#section-trade-2 .info-board", { opacity: 1, y: -20, duration: 1.5 }, 2)
       .to("#quiz-trigger", { autoAlpha: 1, duration: 1, y: -20 }, "+=0.5");

    // 待机悬浮
    gsap.to("#section-trade-2 .cloud-left", { y: 15, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to("#section-trade-2 .cloud-right", { y: -15, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to("#section-trade-2 .bridge-circle", { y: -10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5 });

    // 四大名桥悬停切换
    const circles = document.querySelectorAll("#section-trade-2 .bridge-circle");
    const infoContents = document.querySelectorAll("#section-trade-2 .info-content");
    const defaultInfo = document.querySelector("#section-trade-2 .info-default");

    circles.forEach(circle => {
        circle.addEventListener("mouseenter", () => {
            infoContents.forEach(info => info.classList.remove("show-info"));
            const targetName = circle.getAttribute("data-target");
            const targetInfo = document.querySelector(`#section-trade-2 .info-${targetName}`);
            if(targetInfo) targetInfo.classList.add("show-info");
        });
        circle.addEventListener("mouseleave", () => {
            infoContents.forEach(info => info.classList.remove("show-info"));
            defaultInfo.classList.add("show-info");
        });
    });
    // ==========================================
    // 🌟 答题系统逻辑 (商业与贸易题库)
    // ==========================================
    const quizData = [
        {
            question: "古代“桥市”最先形成于桥梁的哪个位置？",
            options: ["桥底水下", "桥上及桥头", "远离桥梁的田野"],
            answer: 1, // 对应 B
            explanation: "解析：桥梁是交通枢纽，桥上、桥头人流密集，最先形成桥市。"
        },
        {
            question: "桥梁在古代商贸中最核心的作用是？",
            options: ["阻隔交通", "连接两岸、集散货物", "仅供观赏"],
            answer: 1, // 对应 B
            explanation: "解析：桥梁打通江河阻隔，实现货物中转与跨区域贸易。"
        },
        {
            question: "桥梁带动集镇兴起，主要依靠桥梁的什么功能？",
            options: ["通行与中转", "祭祀祈福", "防洪蓄水"],
            answer: 0, // 对应 A
            explanation: "解析：桥梁保障通行与货物中转，汇聚商旅，逐步发展为集镇。"
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
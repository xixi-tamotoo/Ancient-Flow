document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 第一幕：涉险·笮桥 (限定在 #section-1-zeqiao)
    // ==========================================
    let tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-1-zeqiao .stage-1-container",
            start: "top top",
            end: "+=6000", 
            scrub: 1.5,
            pin: true,
        }
    });

    tl1.to("#section-1-zeqiao .cloud-left-wrapper", { x: -800, y: -100, rotation: -25, opacity: 0, scale: 1.5, duration: 1.5 }, 0)
       .to("#section-1-zeqiao .cloud-right-wrapper", { x: 800, y: 100, rotation: 30, opacity: 0, scale: 1.5, duration: 1.5 }, 0)
       .to("#section-1-zeqiao .center-title", { scale: 1.3, opacity: 0, duration: 1 }, 0.2)
       .to("#section-1-zeqiao .img-left-part", { y: "-100vh", duration: 2, ease: "power2.inOut" }, 0.5)
       .to("#section-1-zeqiao .img-right-part", { y: "100vh", duration: 2, ease: "power2.inOut" }, 0.5)
       .from("#section-1-zeqiao .stage-2-panels", { y: 60, opacity: 0, duration: 1.5, ease: "power2.out" }, 1.0)
       .to("#section-1-zeqiao .stage-2-panels", { opacity: 0, y: -40, duration: 1 }, "+=1") 
       .to("#section-1-zeqiao .left-mountain", { scale: 3.2, x: "36vw", y: "25vh", duration: 3, ease: "power2.inOut" }, "<") 
       .to("#section-1-zeqiao .stage-3-panels", { 
           opacity: 1, 
           duration: 1.5,
           onStart: () => document.querySelector('#section-1-zeqiao .stage-3-panels').style.pointerEvents = 'auto',
           onReverseComplete: () => document.querySelector('#section-1-zeqiao .stage-3-panels').style.pointerEvents = 'none'
       }, "-=1.5") 
       .to({}, { duration: 0.5 }) 
       .to("#section-1-zeqiao .slider-thumb", {
           top: "calc(100% - 80px)", 
           duration: 3, 
           ease: "none",
           onUpdate: function() {
               const progress = this.progress();
               const panelBridge = document.querySelector('#section-1-zeqiao .panel-bridge');
               const panelCaravan = document.querySelector('#section-1-zeqiao .panel-caravan');

               if (progress < 0.5) {
                   panelBridge.classList.add('active');
                   panelCaravan.classList.remove('active');
               } else {
                   panelBridge.classList.remove('active');
                   panelCaravan.classList.add('active');
               }
           }
       })
       .to({}, { duration: 1.5 });


    // ==========================================
    // 第二幕：连波·舟浮桥 (限定在 #section-2-fudiao)
    // ==========================================
    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-2-fudiao .stage-1-container",
            start: "top top",
            end: "+=8500",  
            scrub: 1.5,
            pin: true,
        }
    });

    tl2.to("#section-2-fudiao .wave-wrapper", { x: 800, y: 100, rotation: 20, opacity: 0, scale: 1.5, duration: 1.5 }, 0)
       .to("#section-2-fudiao .center-title", { scale: 1.3, opacity: 0, duration: 1 }, 0.2)
       .to("#section-2-fudiao .img-left-part", { x: "-50vw", duration: 2, ease: "power2.inOut" }, 0.5)
       .to("#section-2-fudiao .img-right-part", { x: "50vw", duration: 2, ease: "power2.inOut" }, 0.5)
       .from("#section-2-fudiao .rising-circle-group", { y: "50vh", opacity: 0, duration: 2.5, ease: "power2.out" }, 1.0) 
       .to({}, { duration: 1.5 })
       .add("dynamicPeel")
       .to("#section-2-fudiao .front-waves", { y: "30vh", opacity: 0, duration: 2.5, ease: "power2.in" }, "dynamicPeel")
       .to("#section-2-fudiao .rising-circle-group", { y: "40vh", opacity: 0, duration: 2.5, ease: "power2.in" }, "dynamicPeel")
       .to("#section-2-fudiao .upper-bridge", { opacity: 0, duration: 2, ease: "power2.inOut" }, "dynamicPeel")
       .from("#section-2-fudiao .lower-bridge-group", { y: "-15vh", opacity: 0, duration: 2.5, ease: "power3.out" }, "dynamicPeel+=0.3") 
       .to("#section-2-fudiao .stage-3-intro", { opacity: 1, y: -20, duration: 2, ease: "power2.out" }, "dynamicPeel+=1")
       .to({}, { duration: 2 }) 
       .add("focusAnchor")
       .to("#section-2-fudiao .stage-3-intro", { opacity: 0, y: -40, duration: 1.5 }, "focusAnchor") 
       .to("#section-2-fudiao .lower-bridge-group", { y: "-28vh", duration: 2, ease: "power2.inOut" }, "focusAnchor") 
       .to("#section-2-fudiao .part-banks", { filter: "brightness(0.3)", duration: 1.5 }, "focusAnchor") 
       .to("#section-2-fudiao .part-anchor", { filter: "brightness(1.2) drop-shadow(0 0 20px rgba(226, 192, 115, 0.8))", duration: 1.5 }, "focusAnchor") 
       .to("#section-2-fudiao .anchor-detail", { opacity: 1, y: -20, duration: 1.5, ease: "power2.out" }, "focusAnchor+=0.5") 
       .to({}, { duration: 2 })
       .add("focusBanks")
       .to("#section-2-fudiao .anchor-detail", { opacity: 0, y: -40, duration: 1.5 }, "focusBanks") 
       .to("#section-2-fudiao .part-anchor", { filter: "brightness(0.3) drop-shadow(0 0 0px transparent)", duration: 1.5 }, "focusBanks") 
       .to("#section-2-fudiao .part-banks", { filter: "brightness(1.2) drop-shadow(0 0 20px rgba(226, 192, 115, 0.8))", duration: 1.5 }, "focusBanks") 
       .to("#section-2-fudiao .bank-detail", { opacity: 1, y: -20, duration: 1.5, ease: "power2.out" }, "focusBanks+=0.5"); 


    // ==========================================
    // 第三幕：通济·石拱桥 (限定在 #section-3-shigong)
    // ==========================================
    let tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-3-shigong .stage-1-container",
            start: "top top",
            end: "+=10000", 
            scrub: 1.5,
            pin: true,
        }
    });

    tl3.to("#section-3-shigong .center-title", { scale: 1.3, opacity: 0, duration: 1.5 }, 0.2)
       .to("#section-3-shigong .carriage-wrapper", { y: "100vh", opacity: 0, duration: 1.8, ease: "power2.inOut" }, 0.2)
       .to("#section-3-shigong .img-left-part", { y: "100vh", x: 0, duration: 2, ease: "power2.inOut" }, 0.5)
       .to("#section-3-shigong .img-right-part", { y: "-100vh", x: 0, duration: 2, ease: "power2.inOut" }, 0.5)
       .from("#section-3-shigong .asset-bridge", { scale: 2.5, y: "25vh", transformOrigin: "center bottom", duration: 3, ease: "power2.out" }, 0.5)
       .from("#section-3-shigong .scene-1-bridge .text-panel", { opacity: 0, y: 40, duration: 2 }, 1.5)
       .to({}, { duration: 1.5 }) 
       .add("panRight")
       .to("#section-3-shigong .world-canvas", { x: "-100vw", duration: 4, ease: "power2.inOut" }, "panRight")
       .to("#section-3-shigong .scene-1-bridge", { scale: 0.7, opacity: 0, filter: "blur(20px)", x: "-15vw", duration: 3.5, ease: "power2.in" }, "panRight")
       .from("#section-3-shigong .scene-2-market", { scale: 1.5, opacity: 0, filter: "blur(15px)", x: "25vw", duration: 4, ease: "power2.out" }, "panRight")
       .from("#section-3-shigong .asset-market", { x: "10vw", duration: 4, ease: "power2.out" }, "panRight")
       .from("#section-3-shigong .scene-2-market .text-panel", { opacity: 0, x: 40, duration: 2 }, "panRight+=1.5")
       .to({}, { duration: 1.5 }) 
       .add("panUp")
       .to("#section-3-shigong .world-canvas", { y: "100vh", duration: 4, ease: "power2.inOut" }, "panUp")
       .to("#section-3-shigong .scene-2-market", { scale: 0.7, opacity: 0, filter: "blur(20px)", y: "20vh", duration: 3.5, ease: "power2.in" }, "panUp")
       .from("#section-3-shigong .scene-3-postroad", { scale: 1.5, opacity: 0, filter: "blur(15px)", y: "-25vh", duration: 4, ease: "power2.out" }, "panUp")
       .from("#section-3-shigong .asset-mountains", { y: "-15vh", duration: 4, ease: "power2.inOut" }, "panUp")
       .from("#section-3-shigong .asset-road", { y: "35vh", scale: 1.15, duration: 4, ease: "power2.out" }, "panUp")
       .from("#section-3-shigong .scene-3-postroad .text-panel", { opacity: 0, y: -40, duration: 2 }, "panUp+=1.5")
       .to("#quiz-trigger", { autoAlpha: 1, duration: 1, y: -20 }, "panUp+=2.5");
       // ==========================================
    // 🌟 答题系统逻辑 (交通与连接题库)
    // ==========================================
    const quizData = [
        {
            question: "笮桥（竹索桥）的主要建造材料是？",
            options: ["铁索", "竹索", "石材"],
            answer: 1, // 对应 B
            explanation: "解析：笮桥以竹索、茅索为主要材料，适合西南峡谷急流环境。"
        },
        {
            question: "古代浮桥抵御水流冲击、固定桥身的关键装置是？",
            options: ["栏杆", "地锚（铁牛、木桩）", "桥面木板"],
            answer: 1, // 对应 B
            explanation: "解析：浮桥依靠岸上木桩、水中铁牛等地锚固定，抵抗水流冲击。"
        },
        {
            question: "石拱桥能承受重车、长期稳固，主要依靠什么？",
            options: ["石材拱形结构", "木材支撑", "绳索牵拉"],
            answer: 0, // 对应 A
            explanation: "解析：石拱桥利用石材拱形承重结构，坚固耐用，可通行重型物资。"
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
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. 开场动画 (彻底修复图标和背景闪烁)
    // ==========================================
    let tl = gsap.timeline();

    // ✨ 核心修复 1：初始化时只显示画卷和标题容器，图标容器（.visual-btns-layer）先不处理
    tl.set([".center-gallery", ".title-gallery"], { autoAlpha: 1 })
      
      // 1. 背景宣纸淡入
      .fromTo(".bg-paper", { opacity: 0 }, { opacity: 1, duration: 1.2 })
      
      // 2. 三层字体依次浮现
      .fromTo(".en-title", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "-=0.8")
      .fromTo(".main-title", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.5)" }, "-=1")
      .fromTo(".sub-title", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
      
      // ✨ 核心修复 2：就在文字出现后，此时才开启图标层的可见性 (autoAlpha: 1)
      // 使用 "-=0.5" 让它在文字动画快结束时就开始准备，衔接更自然
      .set(".visual-btns-layer", { autoAlpha: 1 }, "-=0.5") 

      // 3. 底部四个图标淡入弹起
      .fromTo(".btn-visual", 
          { y: 30, opacity: 0 }, 
          { 
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)",
            onComplete: startIdleAnimation 
          }, 
          "-=0.3" // 紧跟在文字后面，几乎无缝衔接
      );

    function startIdleAnimation() {
        document.querySelectorAll(".btn-visual").forEach((btn, i) => {
            gsap.to(btn, {
                y: "-=6", duration: 2 + i * 0.4, repeat: -1, yoyo: true, ease: "sine.inOut"
            });
        });
    }
    // 视差交互：滑动鼠标控制三层素材
    window.addEventListener("mousemove", (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5);
        const yPos = (e.clientY / window.innerHeight - 0.5);
        gsap.to(".en-title", { x: xPos * 45, y: yPos * 35, duration: 1, ease: "power1.out" });
        gsap.to(".main-title", { x: xPos * 20, y: yPos * 15, duration: 1, ease: "power1.out" });
        gsap.to(".sub-title", { x: xPos * 10, y: yPos * 5, duration: 1, ease: "power1.out" });
    });

    // ==========================================
    // 2. 交互逻辑
    // ==========================================
    const hitboxes = document.querySelectorAll(".hitbox");
    const btnVisuals = document.querySelectorAll(".btn-visual");
    const centerImgs = document.querySelectorAll(".center-img");
    const titleGroups = document.querySelectorAll(".title-group");

    hitboxes.forEach(box => {
        box.addEventListener("mouseenter", () => {
            const target = box.getAttribute("data-target"); 
            
            btnVisuals.forEach(v => {
                gsap.killTweensOf(v, "y");
                
                // ✨ 核心修复：擦除 GSAP 强加的透明度，把控制权交还给 CSS !
                v.style.opacity = ""; 
                
                if (v.id === `btn-visual-${target}`) {
                    v.classList.add("hovered");
                    v.classList.remove("dimmed");
                } else {
                    v.classList.add("dimmed");
                    v.classList.remove("hovered");
                }
            });

            // 强制抹除画卷内联样式
            centerImgs.forEach(img => {
                img.style.opacity = ""; 
                img.classList.remove("active");
            });
            titleGroups.forEach(title => {
                title.classList.remove("active");
                title.querySelectorAll("img").forEach(i => i.style.opacity = "");
            });

            const targetImg = document.getElementById(`img-${target}`);
            const targetTitle = document.getElementById(`title-${target}`);
            if(targetImg) targetImg.classList.add("active");
            if(targetTitle) targetTitle.classList.add("active");
        });

        box.addEventListener("mouseleave", () => {
            btnVisuals.forEach(v => {
                v.style.opacity = ""; // 同样在移出时也要擦除
                v.classList.remove("hovered");
                v.classList.remove("dimmed");
            });
            startIdleAnimation();

            centerImgs.forEach(img => {
                img.style.opacity = "";
                img.classList.remove("active");
            });
            titleGroups.forEach(t => t.classList.remove("active"));

            document.getElementById("img-default").classList.add("active");
            document.getElementById("title-default").classList.add("active");
        });
        box.addEventListener("click", () => {
            const target = box.getAttribute("data-target"); 
            
            // 👈 关键修改：因为首页已经在 pages/home 里，
            // 所以跳转到其他板块需要先跳出当前文件夹 (../)
            const targetUrl = `../${target}/index.html`;

            hitboxes.forEach(b => b.style.pointerEvents = "none");
            
            gsap.to(".stage-container", {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    window.location.href = targetUrl;
                }
            });
        });
    });
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
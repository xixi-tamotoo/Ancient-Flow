document.addEventListener("DOMContentLoaded", () => {
    // ===== 音乐播放控制逻辑 =====
    const musicToggle = document.getElementById("music-toggle");
    const bgMusic = document.getElementById("bg-music");

    if (musicToggle && bgMusic) {
        // 为了防止浏览器自动播放限制，初始状态设为暂停样式
        musicToggle.classList.add("paused");

        musicToggle.addEventListener("click", () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.classList.remove("paused");
            } else {
                bgMusic.pause();
                musicToggle.classList.add("paused");
            }
        });
    }
});
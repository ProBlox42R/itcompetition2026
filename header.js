(function () {
    const navItems = [
        { href: "index.html",      label: "Начало" },
        { href: "pravila.html",    label: "Правила" },
        { href: "upotreba.html",   label: "Приложение" },
        { href: "algoritam.html",  label: "Алгоритъм" },
        { href: "convert.html",    label: "Конвертор" },
        { href: "https://wiki.probloxworld.com/rimski",    label: "Документация" }
    ];

    const buildNavLinks = () =>
        navItems.map(item => `<a href="${item.href}">${item.label}</a>`).join("");

    class SiteHeader extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `
                <style>
                    #logo, .drawer-logo {
                        display: flex;
                        flex-direction: column;
                        align-items: center; /* Centers everything */
                        text-decoration: none;
                        line-height: 1.1;
                        text-align: center;
                    }

                    .logo-main {
                        font-size: clamp(1.2rem, 4vw, 1.6rem);
                        font-weight: 900;
                        letter-spacing: -0.5px;
                        color: var(--text);
                        white-space: nowrap;
                    }

                    .logo-main span {
                        background: linear-gradient(to right, var(--primary), var(--accent));
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }

                    .logo-sub {
                        font-size: 0.6rem;
                        font-weight: 500;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        opacity: 0.7;
                        color: var(--text);
                        margin-top: -2px; /* Pulls it closer to the main text */
                    }
                </style>

                <header class="site-header">
                    <a href="index.html" id="logo">
                        <div class="logo-main">Римски<span>цифри</span></div>
                        <div class="logo-sub">от древността до наши дни</div>
                    </a>

                    <nav class="nav-links" aria-label="Основна навигация">
                        ${buildNavLinks()}
                    </nav>

                    <div style="display:flex;align-items:center;gap:.5rem;">
                        <button class="theme-toggle" type="button" aria-label="Превключи тема">
                            <span class="dot">☀</span>
                        </button>
                        <button class="hamburger" type="button" aria-label="Меню" aria-expanded="false">
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </header>
            `;

            // Update Drawer (matches the header style)
            const drawer = document.createElement("aside");
            drawer.className = "drawer";
            drawer.setAttribute("aria-hidden", "true");
            drawer.innerHTML = `
                <div class="drawer-header">
                    <a href="index.html" class="drawer-logo">
                        <div class="logo-main">Римски<span>цифри</span></div>
                        <div class="logo-sub">от древността до наши дни</div>
                    </a>
                </div>
                <nav aria-label="Мобилно меню">
                    ${buildNavLinks()}
                </nav>
            `;

            // ... (keep the rest of your original logic for scrim, hamburger, and theme toggle)
            const scrim = document.createElement("div");
            scrim.className = "drawer-scrim";
            document.body.appendChild(scrim);
            document.body.appendChild(drawer);

            const hamburger = this.querySelector(".hamburger");
            const themeBtn  = this.querySelector(".theme-toggle");
            const links     = drawer.querySelectorAll("a");

            const closeDrawer = () => {
                drawer.classList.remove("open");
                scrim.classList.remove("active");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
                drawer.setAttribute("aria-hidden", "true");
                document.body.classList.remove("drawer-open");
            };

            const openDrawer = () => {
                drawer.classList.add("open");
                scrim.classList.add("active");
                hamburger.classList.add("active");
                hamburger.setAttribute("aria-expanded", "true");
                drawer.setAttribute("aria-hidden", "false");
                document.body.classList.add("drawer-open");
            };

            hamburger.addEventListener("click", () => {
                drawer.classList.contains("open") ? closeDrawer() : openDrawer();
            });

            scrim.addEventListener("click", closeDrawer);
            links.forEach(link => link.addEventListener("click", closeDrawer));
            window.addEventListener("resize", () => {
                if (window.innerWidth > 900) closeDrawer();
            });

            const applyTheme = (mode) => {
                document.documentElement.setAttribute("data-theme", mode);
                localStorage.setItem("theme", mode);
                const dot = themeBtn.querySelector(".dot");
                if (dot) dot.textContent = mode === "dark" ? "🌙" : "☀";
            };

            const storedTheme = localStorage.getItem("theme");
            if (storedTheme) applyTheme(storedTheme);

            themeBtn.addEventListener("click", () => {
                const current = document.documentElement.getAttribute("data-theme");
                applyTheme(current === "dark" ? "light" : "dark");
            });
        }
    }

    class SiteFooter extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `
                <footer class="footer">
                    <div class="footer-content">
                        <div>
                            <h4>Контакт</h4>
                            <p>40 СУ "Луи Пастьор"</p>
                            <p><a href="mailto:primeit@probloxworld.com">primeit@probloxworld.com</a></p>
                        </div>
                        <div>
                            <h4>Навигация</h4>
                            <p><a href="index.html">Начало</a></p>
                            <p><a href="pravila.html">Правила</a></p>
                            <p><a href="convert.html">Конвертор</a></p>
                        </div>
                        <div>
                            <h4>Олимпиада</h4>
                            <p>ИТ Проект 2026</p>
			    <p><a href="https://wiki.probloxworld.com/rimski">Документация (Натисни ме!)</a></p>
                        </div>
                    </div>
                </footer>
                <div class="footer-bottom">
                    <a href="https://primeit.probloxworld.com" target="_blank" class="primeit-credit">
                        <img src="images/primeit-white.png" alt="PrimeIT Group 40SU" class="primeit-logo logo-light">
                        <img src="images/primeit-dark.png" alt="PrimeIT Group 40SU" class="primeit-logo logo-dark">
                    </a>
                </div>
            `;
        }
    }

    customElements.define("site-header", SiteHeader);
    customElements.define("site-footer", SiteFooter);
})();

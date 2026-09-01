(function () {

    const DEFAULT_LANGUAGE = 'en';
    const TARGET_LANGUAGE = 'es';

    function getLanguage() {
        const match = document.cookie.match(
            /(?:^|;\s*)googtrans=([^;]+)/
        );

        if (!match) {
            return DEFAULT_LANGUAGE;
        }

        const value = decodeURIComponent(match[1]);

        return value.includes('/es')
            ? TARGET_LANGUAGE
            : DEFAULT_LANGUAGE;
    }

    function setGoogleLanguage(language) {
        const value = `/en/${language}`;

        document.cookie = `googtrans=${value}; path=/; SameSite=Lax`;

        // Remove possible old Google cookie on the current domain
        if (language === DEFAULT_LANGUAGE) {
            document.cookie =
                'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        } else {
            document.cookie =
                `googtrans=${value}; path=/`;
        }

        window.location.reload();
    }

    function updateButtons() {
        const buttons = [
            document.getElementById('languageBtn'),
            document.getElementById('languageBtnDesktop'),
            document.getElementById('languageBtnMobile')
        ].filter(Boolean);

        if (!buttons.length) return;

        const currentLanguage = getLanguage();

        buttons.forEach(button => {

            if (currentLanguage === TARGET_LANGUAGE) {
                button.textContent = 'ENG';

                button.onclick = function () {
                    setGoogleLanguage(DEFAULT_LANGUAGE);
                };

            } else {
                button.textContent = 'ESP';

                button.onclick = function () {
                    setGoogleLanguage(TARGET_LANGUAGE);
                };
            }
        });
    }

    window.googleTranslateElementInit = function () {

        new google.translate.TranslateElement(
            {
                pageLanguage: DEFAULT_LANGUAGE,
                includedLanguages: 'es',
                autoDisplay: false
            },
            'google_translate_element'
        );

    };

    updateButtons();

})();
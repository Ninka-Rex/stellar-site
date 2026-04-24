(() => {
    const owner = "Ninka-Rex";
    const repo = "Stellar";
    const releasePage = `https://github.com/${owner}/${repo}/releases/latest`;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

    const targets = {
        windows: [
            /setup\.exe$/i,
            /stellar.*\.exe$/i,
        ],
        linux: [
            /\.deb$/i,
        ],
    };

    function pickAsset(assets, rules) {
        return assets.find((asset) => rules.some((rule) => rule.test(asset.name)));
    }

    function setLink(type, url, label) {
        document.querySelectorAll(`[data-release-link="${type}"]`).forEach((link) => {
            link.href = url;
            if (label) link.textContent = label;
        });
    }

    async function loadReleaseAssets() {
        try {
            const response = await fetch(apiUrl, {
                headers: { Accept: "application/vnd.github+json" },
            });

            if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

            const release = await response.json();
            const assets = Array.isArray(release.assets) ? release.assets : [];

            const windowsAsset = pickAsset(assets, targets.windows);
            const linuxAsset = pickAsset(assets, targets.linux);

            if (windowsAsset) {
                setLink("windows", windowsAsset.browser_download_url, `Download ${windowsAsset.name}`);
            } else {
                setLink("windows", releasePage, "View latest release");
            }

            if (linuxAsset) {
                setLink("linux", linuxAsset.browser_download_url, `Download ${linuxAsset.name}`);
            } else {
                setLink("linux", releasePage, "View latest release");
            }
        } catch (error) {
            setLink("windows", releasePage, "View latest release");
            setLink("linux", releasePage, "View latest release");
        }
    }

    loadReleaseAssets();
})();

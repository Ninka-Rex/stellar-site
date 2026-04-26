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

    function setPackageName(type, name) {
        document.querySelectorAll(`[data-release-package="${type}"]`).forEach((node) => {
            node.textContent = name;
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
                setPackageName("windows", windowsAsset.name);
            } else {
                setLink("windows", releasePage, "View latest release");
            }

            if (linuxAsset) {
                setLink("linux", linuxAsset.browser_download_url, `Download ${linuxAsset.name}`);
                setPackageName("linux", linuxAsset.name);
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

(() => {
    const torrentFeatureImage = document.getElementById("torrent-feature-image");
    if (torrentFeatureImage) {
        const torrentImages = [
            {
                src: "screenshots/torrent-properties.png",
                alt: "Stellar torrent properties",
            },
            {
                src: "screenshots/torrent-swarm-map.png",
                alt: "Stellar torrent swarm map",
            },
            {
                src: "screenshots/torrent-peer-list.png",
                alt: "Stellar torrent peer list",
            },
        ];

        let currentTorrentImage = 0;

        function showTorrentImage(index) {
            currentTorrentImage = index;
            torrentFeatureImage.src = torrentImages[currentTorrentImage].src;
            torrentFeatureImage.alt = torrentImages[currentTorrentImage].alt;
        }

        showTorrentImage(0);
        setInterval(() => {
            showTorrentImage((currentTorrentImage + 1) % torrentImages.length);
        }, 5000);
    }

    const uiFeatureImage = document.getElementById("ui-feature-image");
    if (uiFeatureImage) {
        const uiImages = [
            {
                src: "screenshots/ui.png",
                alt: "Modern cross platform UI",
            },
            {
                src: "screenshots/stellar-preferences-about.png",
                alt: "Stellar preferences about dialog",
            },
        ];

        let currentUiImage = 0;

        function showUiImage(index) {
            currentUiImage = index;
            uiFeatureImage.src = uiImages[currentUiImage].src;
            uiFeatureImage.alt = uiImages[currentUiImage].alt;
        }

        showUiImage(0);
        setInterval(() => {
            showUiImage((currentUiImage + 1) % uiImages.length);
        }, 5000);
    }
})();

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
        "linux-rpm": [
            /\.rpm$/i,
        ],
        firefox: [
            /\.xpi$/i,
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
            const linuxRpmAsset = pickAsset(assets, targets["linux-rpm"]);

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

            if (linuxRpmAsset) {
                setLink("linux-rpm", linuxRpmAsset.browser_download_url, `Download ${linuxRpmAsset.name}`);
                setPackageName("linux-rpm", linuxRpmAsset.name);
            } else {
                setLink("linux-rpm", releasePage, "View latest release");
            }

            const firefoxAsset = pickAsset(assets, targets.firefox);
            if (firefoxAsset) {
                setLink("firefox", firefoxAsset.browser_download_url, `Download ${firefoxAsset.name}`);
                setPackageName("firefox", firefoxAsset.name);
            }
        } catch (error) {
            setLink("windows", releasePage, "View latest release");
            setLink("linux", releasePage, "View latest release");
            setLink("linux-rpm", releasePage, "View latest release");
            setLink("firefox", releasePage, "View latest release");
        }
    }

    loadReleaseAssets();
})();

(() => {
    const heroButton = document.querySelector("[data-hero-download]");
    if (!heroButton) return;

    const ua = navigator.userAgent;
    const isLinux = /Linux/.test(ua) && !/Android/i.test(ua);
    if (!isLinux) return;

    const rpmDistro = /Fedora|Red Hat|SUSE|CentOS|AlmaLinux|Rocky|Mageia/i.test(ua);
    const label = heroButton.querySelector("[data-hero-download-label]");
    if (label) {
        label.textContent = `↓ Download for Linux (.${rpmDistro ? "rpm" : "deb"})`;
    }

    // Swap the Windows logo for the Tux silhouette used in the .deb table row.
    const icon = heroButton.querySelector("[data-hero-download-icon]");
    if (icon) {
        icon.ownerSVGElement.setAttribute("viewBox", "70 45 320 360");
        icon.setAttribute("d", "M352.271,348.95c-13.2,7.348-36.707,19.102-45.519,28.435c-8.794,9.265-22.515,8.794-28.888,5.314c-6.373-3.413-9.787-11.233-9.787-11.233s-17.605-4.389-36.203-3.868c-18.58,0.454-36.253,4.406-36.253,4.406s-4.86,12.678-20.565,10.695c-15.621-1.9-34.286-12.662-50.9-14.646c-16.68-1.967-33.764-5.381-30.351-16.613c3.414-11.233,6.372-16.159,3.414-24.954c-2.943-8.811-2.943-16.681,9.265-19.186c12.292-2.371,19.119-5.852,22.533-13.133c3.48-7.365,7.886-8.879,7.886-8.879s-4.405-10.24,1.9-21.473c6.44-11.3,12.814-38.691,21.608-51.959c8.811-13.2,22.078-28.956,23.978-33.294c1.9-4.271,2.438-16.159,1.446-32.773c-0.992-16.698-7.298-51.891,13.268-66.084c20.565-14.191,58.718-16.159,73.432,17.135c14.713,33.244,0.992,59.257,17.151,81.789c16.159,22.465,37.178,52.346,43.551,70.926c6.373,18.665-0.471,41.197-0.471,41.197s7.819,6.827,7.365,17.067c-0.521,10.325,6.306,15.706,14.646,19.119C363.117,330.353,365.555,341.585,352.271,348.95z");
    }
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
                src: "screenshots/ui-light.png",
                alt: "Modern cross platform UI (light theme)",
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

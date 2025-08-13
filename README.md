# 🛠️ Ignition

## Ignition is a minimal app for editing autostart entries on Freedesktop-compliant Linux distributions.

![Image of the Ignition app, showing a small, vertical list of entries that relate to autostart applications on Linux](app_page_screeshots/main_list.png)

## 🚀 Main Features:

1. View your startup entries
2. Create startup entries for installed apps
3. Create startup entries for saved scripts
4. Create startup entries for arbitrary commands

## ⏬ Installation:

Ignition is now available on Flathub! Visit your software store and search for Ignition, or click this badge.

<a href="https://flathub.org/apps/io.github.flattool.Ignition"><img width='240' alt='Download on Flathub' src='https://flathub.org/api/badge?locale=en'/></a>

## 🗣️ Translation
- Translation is hosted with Weblate on Fyra Labs, [click here](https://weblate.fyralabs.com/projects/flattool/ignition/) to contribute

<a href="https://weblate.fyralabs.com/engage/ignition/">
<img src="https://weblate.fyralabs.com/widget/flattool/ignition/multi-auto.svg" alt="Translation status" />
</a>

## 💬 Get in Contact

- We have a [Discord Server](https://discord.gg/Sq85C42Xkt) and a [Matrix Space](https://matrix.to/#/#warehouse-development:matrix.org) to discuss and send announcements in!
- You can always open issues, PRs, and use other GitHub features here

## 📜 Code of Conduct
- The Ignition project follows the [GNOME Code of Conduct](https://conduct.gnome.org/). See `CODE_OF_CONDUCT.md` for more information.

## 🛠️ Installation from Repo Steps:
1. Visit the [releases](https://github.com/flattool/ignition/releases) page and download `io.github.flattool.Ignition.Flatpak`.
2. Install it using your software store or run the following command:
   ```shell
   flatpak install /path/to/io.github.flattool.Ignition.flatpak
   ```
You're all set! Launch the application by clicking its icon in your app menu or running:
```shell
flatpak run io.github.flattool.Warehouse
```

## 👥 Contributing

### Compiling from Source

Make sure `flatpak` and `git` are installed, then run the following to build from the repo:
```bash
# Clone this repo and enter it
git clone https://github.com/flattool/ignition
cd ignition
git submodule update --init

# Install build dependencies
flatpak install org.flatpak.Builder org.gnome.Sdk//48 org.gnome.Platform//48 org.freedesktop.Sdk.Extension.typescript//24.08 org.freedesktop.Sdk.Extension.node20//24.08 -y

# Build, install, and run Ignition
./run.sh
```

### Formatting
Ignition uses [ESLint](https://eslint.org/) plugins for code formatting. An NPM package file is provided for easy installation.
- Install using `npm install` in the project root directory

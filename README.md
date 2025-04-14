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

# Install build dependencies
flatpak install org.flatpak.Builder org.gnome.Sdk//48 org.gnome.Platform//48 org.freedesktop.Sdk.Extension.node20//24.08 -y

# Build and install Ignition
flatpak run org.flatpak.Builder _build ./build-aux/io.github.flattool.Ignition.json --install --user --force-clean
```

### Formatting

Ignition uses [pre-commit](https://pre-commit.com/) for code formatting.
- Install using `pip install pre-commit`
- Run `pre-commit install` in the Ignition repository root to set up pre-commit for this repo.
- Run `pre-commit run --all-files` to format all files in the repository.

If you run into a situation where pre-commit is broken, you can use `git commit --no-verfiy` to skip the pre-commit checks.

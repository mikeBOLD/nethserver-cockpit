# Application manifest

Applications are described by a JSON manifest inspired to [AppData](https://www.freedesktop.org/software/appstream/docs/chap-Quickstart.html)
and [NPM package.json](https://docs.npmjs.com/files/package.json) formats.

The manifest is used both for generating the "Applications" page and for a future App store.

Manifest must be placed under `/usr/share/cockpit/nethserver/applications` directory and named with the application id like `<id>.json`;

## Format

- **id**: this tag contains the unique identifier for this application (required)
- **name**: descriptive name of the application (required)
- **summary**: describe what is the purpose of the application in few words (required)
- **description**: include 2-3 paragraphs describing any important features. Each line should be an element of the array. Supports markdown format. (recommended)
- **icon**: name of the icon file; the icon should be 256x256px (recommended)
- **screenshots**: a list of screenshots; all screenshots should have a 16:9 aspect ratio, and should have a width that is no smaller than 620px (optional)
- **url**: link to local application installation. (required for web applications)
- **homepage**: this is a recommended tag for link project official site (optional)
- **release**: define the version and release date of this application (recommended)
- **provides**: list of provided RPM packages (optional)
- **tags**: list of keywords to help people discover content of the application (optional)
- **license**: license of the application, please pick one from [SPDX list](https://spdx.org/licenses/) (recommended)
- **bugs**: the url of project's issue tracker and / or the email address to which issues should be reported (optional)
- **author**: the name of of the author with optional email and urls fields. (recommended)

Images like screenshots and icons must be placed under `/usr/share/cockpit/<application-id>/` directory.

The `url` field should contain the URL to access the installed Web application. It should

- be empty, if the application doesn't have its own external Web interface
- start with `/`, if the application is hosted under the default virtualhost; example: `/webtop`
- contain a full URL if the application is hosted inside a dedicated virtual host, example: `https://mattermost.nethserver.org`.
  In this case, the application should take care to update is own application manifest using a template

### Example

File `/usr/share/cockpit/nethserver/applications/nextcloud.json`:
```
{
    "id": "nethserver-netxtcloud",
    "name": "NextCloud",
    "summary": "Share your data",
    "description": [
        "Access, **share** and protect your files, calendars, contacts, communication & more at home and in your enterprise.",
        "Nextcloud puts your data at your fingertips, under your control."
    ],
    "icon": "icon.png",
    "screenshots": [
        { "caption": "Login", "image": "login.png" },
        { "caption": "Share data", "image": "data.png" }
    ],
    "url": "/nextcloud",
    "homepage": "http://www.nextcloud.org",
    "provides": ["nextcloud", "nethserver-nextcloud"],
    "release": {
        "version": "12.0.2"
    },
    "tags": [
        "cloud",
        "files",
        "share"
    ],
    "license": "GPL-3.0",
    "bugs": {
        "url": "https://github.com/owner/project/issues",
        "email": "project@hostname.com"
    },
    "author": {
        "name": "Nextcloud",
        "url": "https://nextcloud.com",
        "email": "info@nextcloud.com"
    }
}
```


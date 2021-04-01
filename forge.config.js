const config = {
  packagerConfig: {
    icon: './assets/images/icon.icns',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'Proswitch',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  publishers: [
    {
      name: 'proswitch',
      config: {
        repository: {
          owner: 'alvesjtiago',
          name: 'proswitch',
        },
        prerelease: true,
      },
    },
  ],
}

module.exports = config

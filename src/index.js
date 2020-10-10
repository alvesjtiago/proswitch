const { app, Menu, Tray, globalShortcut } = require('electron')
const AutoLaunch = require('auto-launch')
const exec = require('child_process').exec
const path = require('path')
var fs = require('fs')

// Auto launch application on startup
let autoLaunch = new AutoLaunch({
  name: 'Proswitch',
  isHidden: true
})
autoLaunch.isEnabled().then((isEnabled) => {
  if (!isEnabled) autoLaunch.enable()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  // Menu bar icon
  const appIcon = new Tray(path.join(__dirname, '../assets/images/icon.png'))

  fs.readFile(
    path.join(
      app.getPath('home'),
      `/Library/Application\ Support/Google/Chrome/Local\ State`
    ),
    'utf8',
    function (err, data) {
      if (err) console.log(err)
      let menuItems = []

      if (data) {
        const localState = JSON.parse(data)
        const profiles = Object.keys(localState.profile.info_cache)

        menuItems = profiles.map((profileName, index) => {
          displayName = localState.profile.info_cache[profileName].name

          const openCommand = `open -na "Google Chrome" --args --profile-directory="${profileName}"`

          const indexNumber = index + 1
          globalShortcut.register('Command+Option+' + indexNumber, () => {
            exec(openCommand)
          })

          return {
            label: displayName,
            accelerator: 'Command+Option+' + indexNumber,
            acceleratorWorksWhenHidden: true,
            type: 'normal',
            click: () => {
              exec(openCommand)
            },
          }
        })
      }

      menuItems.push({
        label: 'Quit',
        type: 'normal',
        click: () => {
          app.quit()
        },
      })

      const contextMenu = Menu.buildFromTemplate(menuItems)
      appIcon.setToolTip('Proswitch')
      appIcon.setContextMenu(contextMenu)
    }
  )

  // Hide dock menu
  app.dock.hide()
})

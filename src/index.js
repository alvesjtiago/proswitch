const { app, Menu, Tray } = require('electron')
const exec = require('child_process').exec
const path = require('path')
var fs = require('fs')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  // Menu bar icon
  const appIcon = new Tray(path.join(__dirname, '../assets/images/icon.png'))

  fs.readFile(
    path.join(
      app.getPath('home'),
      `/Library/Application\ Support/Google/Chrome/Local\ State`
    ),
    'utf8',
    function(err, data) {
      if (err) console.log(err)
      let menuItems = []

      if (data) {
        const localState = JSON.parse(data)
        const profiles = Object.keys(localState.profile.info_cache)

        menuItems = profiles.map(profileName => {
          displayName = localState.profile.info_cache[profileName].name
          return {
            label: displayName,
            type: 'normal',
            click: () => {
              exec(
                `open -na "Google Chrome" --args --profile-directory="${profileName}"`
              )
            }
          }
        })
      }

      menuItems.push({
        label: 'Quit',
        type: 'normal',
        click: () => {
          app.quit()
        }
      })

      const contextMenu = Menu.buildFromTemplate(menuItems)
      appIcon.setToolTip('Proswitch')
      appIcon.setContextMenu(contextMenu)
    }
  )

  // Hide dock menu
  app.dock.hide()
})

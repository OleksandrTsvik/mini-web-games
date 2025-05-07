# Setup

## .vscode

### settings.json

```json
{
  "editor.wordWrap": "on",
  "editor.formatOnPaste": false,
  "editor.formatOnSave": true,
  "editor.tabSize": 2,

  "terminal.integrated.persistentSessionReviveProcess": "never",
  "terminal.integrated.enablePersistentSessions": false,

  "workbench.iconTheme": "material-icon-theme",
  "material-icon-theme.activeIconPack": "nest"
}
```

### terminals.json

[Terminals Manager](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-terminals)

```json
{
  "autorun": true,
  "autokill": true,
  "terminals": [
    {
      "name": "run",
      "icon": "terminal",
      "color": "terminal.ansiYellow",
      "commands": ["npm run dev"],
      "execute": false,
      "shellPath": "C:\\Program Files\\Git\\bin\\bash.exe"
    },
    {
      "name": "root",
      "icon": "file-directory",
      "color": "terminal.ansiBlue",
      "shellPath": "C:\\Program Files\\Git\\bin\\bash.exe"
    }
  ]
}
```

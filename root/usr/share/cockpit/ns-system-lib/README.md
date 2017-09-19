# ns-system-lib

System NethServer API

## Development


Run build task on ``src/`` contents and output the resulting files under  ``dist/``:

```
grunt build
```

Transfer files to ``~/.local/share/cockpit/ns-base1/``:

```
grunt sync root@192.168.122.7
```

Transfer files to other directory/port:

```
grunt sync root@192.168.122.7:2222:/usr/local/share/custom/
```
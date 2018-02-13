# rvl-dev

Revelat.io CLI dev tool. It provides command line interface
to some Revelatio development functions

## Auth
```$ rvl-dev auth <token>```

Stores Revelat.io auth token needed for most CLI operations. You can
find your token at `~/.rvl/auth`

## Env
```$ rvl-dev env```

Retrieves development environment variables and stores them in `.env`
file. It uses local package.json file to get repo/project.

This command only retrieves development environment vars.
